import {
  MATCH_FEEDS,
  UPDATE_LIKE,
  DELETE_LIKE,
  GET_NEW_FEED,
  GET_FRIENDS,
  WRITE_COMMENT,
  ALARM_NEW_FEED,
  GET_FEED_ARALMS
} from '../../schema/feed/query';
import { parseResultRecords } from '../../utils/parseData';

import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import {
  WRITING_FEED_QUERY,
  createImageNodeAndRelation
} from '../../schema/feed/query';

import createDBError from '../../errors/createDBError';

import { dateToISO, objToDate } from '../../utils/dateutil';
import { withFilter } from 'graphql-subscriptions';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  MutationResolvers,
  MutationEnrollFeedArgs,
  QueryResolvers,
  QueryFeedsArgs,
  MutationWriteCommentArgs,
  Alarm
} from '../../types';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const getUpdateLikeQuery = count => {
  if (count > 0) {
    return UPDATE_LIKE;
  } else {
    return DELETE_LIKE;
  }
};

const createImages = async (pubsub, email, feedId, files) => {
  try {
    const filePromises: Array<Promise<any>> = [];
    for await (const file of files) {
      const { filename, createReadStream } = file;
      filePromises.push(uploadToObjStorage(createReadStream(), filename));
    }
    const fileLocations = await Promise.all(filePromises);
    const matchQuery = `MATCH (f:Feed) WHERE ID(f) = $feedId `;
    let REGISTER_IMAGE = fileLocations.reduce((acc, { Location }, idx) => {
      acc += createImageNodeAndRelation(idx, Location);
      return acc;
    }, matchQuery);
    REGISTER_IMAGE += ' RETURN f';
    await requestDB(REGISTER_IMAGE, { feedId });
    publishingFeed(pubsub, feedId, email);
  } catch (error) {
    console.error(error);
  }
};

const publishingFeed = async (pubsub, feedId, email) => {
  const registerdFeed = await requestDB(GET_NEW_FEED, {
    feedId,
    useremail: email
  });

  const parsedRegisterdFeed = parseResultRecords(registerdFeed);
  pubsub.publish(NEW_FEED, {
    feeds: {
      cursor: '',
      feedItems: parsedRegisterdFeed
    }
  });
};

const checkIsFriend = async (friendEmail, myEmail) => {
  const result = await requestDB(GET_FRIENDS, {
    userEmail: myEmail,
    friendEmail
  });
  const [parsedResult] = parseResultRecords(result);

  return parsedResult.isFriend > 0;
};

const mutationResolvers: MutationResolvers = {
  enrollFeed: async (
    _,
    { content, files }: MutationEnrollFeedArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    const params = { content, email };
    try {
      const results = await requestDB(WRITING_FEED_QUERY, params);
      const feedId = Number(results[0].get(0).identity);
      const FILE_LIMIT = 30;

      if (files && files.length < FILE_LIMIT) {
        createImages(pubsub, email, feedId, files);
      } else {
        publishingFeed(pubsub, feedId, email);
      }

      await requestDB(ALARM_NEW_FEED, {
        feedId,
        userEmail: email
      });

      return true;
    } catch (error) {
      console.log(error);
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    isAuthenticated(req);
    const useremail = req.email;

    const UPDATE_QUERY = getUpdateLikeQuery(count);
    try {
      await requestDB(UPDATE_QUERY, {
        useremail,
        feedId
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  writeComment: async (
    _,
    { feedId, content }: MutationWriteCommentArgs,
    { req }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;

    try {
      await requestDB(WRITE_COMMENT, {
        userEmail,
        feedId,
        content
      });

      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

const queryResolvers: QueryResolvers = {
  feeds: async (
    _,
    { first, cursor = DEFAUT_MAX_DATE }: QueryFeedsArgs,
    { req }
  ): Promise<any> => {
    isAuthenticated(req);
    const useremail = req.email;

    const result = await requestDB(MATCH_FEEDS, {
      cursor,
      first,
      useremail
    });

    const feeds = parseResultRecords(result);
    const lastFeed = feeds[feeds.length - 1];
    const cursorDate = lastFeed.feed.createdAt;
    const cursorDateType = objToDate(cursorDate);
    const dateDBISOString = dateToISO(cursorDateType);

    const ret = {
      cursor: dateDBISOString,
      feedItems: feeds
    };
    return ret;
  },
  alarms: async (_, __, { req }): Promise<Alarm[]> => {
    isAuthenticated(req);
    const userEmail = req.email;
    const result = await requestDB(GET_FEED_ARALMS, {
      userEmail
    });
    const [parsedAlarms] = parseResultRecords(result);

    return parsedAlarms.alarms;
  }
};

const NEW_FEED = 'NEW_FEED_PUBSUB';

export default {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: {
    feeds: {
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator(NEW_FEED);
        },
        async (payload, _, context) => {
          const myEmail = context.email;
          const friendEmail = payload.feeds.feedItems[0].searchUser.email;
          const isFriend = await checkIsFriend(friendEmail, myEmail);

          if (isFriend || myEmail === friendEmail) {
            return true;
          } else {
            return false;
          }
        }
      )
    }
  }
};
