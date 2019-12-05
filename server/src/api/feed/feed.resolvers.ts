import db from '../../db';
import {
  MATCH_FEEDS,
  UPDATE_LIKE,
  DELETE_LIKE,
  GET_NEW_FEED,
  GET_FRIENDS
} from '../../schema/feed/query';
import { ParseResultRecords } from '../../utils/parseData';
import {
  MutationEnrollFeedArgs,
  MutationResolvers,
  QueryResolvers,
  QueryFeedsArgs
} from '../../types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';

import {
  WRITING_FEED_QUERY,
  createImageNodeAndRelation
} from '../../schema/feed/query';

import { dateToISO, objToDate } from '../../utils/dateutil';
import { withFilter } from 'graphql-subscriptions';
import isAuthenticated from '../../utils/isAuthenticated';
const session = db.session();

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const getUpdateLikeQuery = count => {
  if (count > 0) {
    return UPDATE_LIKE;
  } else {
    return DELETE_LIKE;
  }
};

const checkReqUserEmail = (req): boolean => {
  if (!req.email) {
    console.log('사용자 정보가 없습니다 다시 로그인해 주세요');
    return false;
  }
  return true;
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
    let RegisterImagesQuery = fileLocations.reduce((acc, { Location }, idx) => {
      acc += createImageNodeAndRelation(idx, Location);
      return acc;
    }, matchQuery);
    RegisterImagesQuery += ' RETURN f';
    await requestDB(RegisterImagesQuery, { feedId });
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

  const parsedRegisterdFeed = ParseResultRecords(registerdFeed);
  pubsub.publish(NEW_FEED, {
    feeds: {
      cursor: '',
      feedItems: parsedRegisterdFeed
    }
  });
};

const checkIsFriend = async (friendEmail, myEmail) => {
  const result = await session.run(GET_FRIENDS, {
    userEmail: myEmail,
    friendEmail
  });
  const [parsedResult] = ParseResultRecords(result.records);

  if (parsedResult.isFriend > 0) {
    return true;
  }
  return false;
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.email;
    }

    const UPDATE_QUERY = getUpdateLikeQuery(count);
    await session.run(UPDATE_QUERY, {
      useremail,
      feedId
    });

    return true;
  }
};

const queryResolvers: QueryResolvers = {
  feeds: async (
    _,
    { first, cursor = DEFAUT_MAX_DATE }: QueryFeedsArgs,
    { req }
  ): Promise<any> => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.email;
    }
    const result = await session.run(MATCH_FEEDS, {
      cursor,
      first,
      useremail
    });

    const feeds = ParseResultRecords(result.records);
    const lastFeed = feeds[feeds.length - 1];
    const cursorDate = lastFeed.feed.createdAt;
    const cursorDateType = objToDate(cursorDate);
    const dateDBISOString = dateToISO(cursorDateType);

    const ret = {
      cursor: dateDBISOString,
      feedItems: feeds
    };
    return ret;
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
