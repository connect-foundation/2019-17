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
  QueryResolvers
} from '../../types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import { WRITING_FEED_QUERY, createImageNodeAndRelation } from './feed.query';
import console = require('console');
import { FeedsQueryArgs } from 'src/types/graph';
import { dateToISO, objToDate } from '../../utils/dateutil';
import { withFilter } from 'graphql-subscriptions';

const session = db.session();

// property로 조회할 때

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const getUpdateLikeQuery = count => {
  if (count > 0) {
    return UPDATE_LIKE;
  } else {
    return DELETE_LIKE;
  }
};

const checkReqUserEmail = (req): boolean => {
  if (!req.user) {
    console.log('사용자 정보가 없습니다 다시 로그인해 주세요');
    return false;
  }
  return true;
};

const createImages = async (feedId, files) => {
  try {
    let filePromises: Promise<any>[] = [];
    for await (const file of files) {
      const { filename, createReadStream } = file;
      filePromises = [
        ...filePromises,
        uploadToObjStorage(createReadStream(), filename)
      ];
    }
    const fileLocations = await Promise.all(filePromises);
    const matchQuery = `MATCH (f:Feed) WHERE ID(f) = $feedId `;
    const query = fileLocations.reduce((acc, { Location }, idx) => {
      acc += createImageNodeAndRelation(idx, Location);
      return acc;
    }, matchQuery);
    await requestDB(query, { feedId });
  } catch (error) {
    console.error(error);
  }
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
    const { email } = req;
    if (!email) return false;
    const params = { content, email };
    const results = await requestDB(WRITING_FEED_QUERY, params);
    const feedId = Number(results[0].get(0).identity);
    if (files && files.length) {
      createImages(feedId, files);
    }

    const registerdFeed = await requestDB(GET_NEW_FEED, {
      feedId,
      useremail: email
    });

    // console.log('registerdFeed?? ', registerdFeed);
    const parsedRegisterdFeed = ParseResultRecords(registerdFeed);
    // console.log('parsedRegisterdFeed?? ', parsedRegisterdFeed);

    pubsub.publish(NEW_FEED, {
      feeds: {
        cursor: '',
        feedItems: parsedRegisterdFeed
      },
      pubUserEmail: email
    });
    return true;
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.user.email;
    }
    console.log('UPDATE_QUERY', feedId, count, useremail);
    const UPDATE_QUERY = getUpdateLikeQuery(count);
    const result = await session.run(UPDATE_QUERY, {
      useremail,
      feedId
    });

    console.log('result: ', JSON.stringify(result, null, 2));
    return true;
  }
};

const queryResolvers: QueryResolvers = {
  feeds: async (
    _,
    { first, cursor = DEFAUT_MAX_DATE }: FeedsQueryArgs,
    { req }
  ): Promise<any> => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.user.email;
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
        async (_, variables, context) => {
          const myEmail = context.email;
          const friendEmail = variables.userEmail;
          const isFriend = checkIsFriend(friendEmail, myEmail);

          return isFriend;
        }
      )
    }
  }
};
