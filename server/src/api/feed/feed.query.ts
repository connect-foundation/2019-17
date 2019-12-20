import { dateToISO, objToDate } from '../../utils/dateutil';
import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseDB';
import {
  QueryResolvers,
  QueryFeedsArgs,
  QueryUserFeedsArgs,
  QueryFeedArgs,
  IFeed
} from '../../types';
import {
  MATCH_FEEDS,
  GET_NEW_FEED,
  MATCH_USER_FEEDS
} from '../../schema/feed/query';

const queryResolvers: QueryResolvers = {
  feeds: async (
    _,
    { first, cursor }: QueryFeedsArgs,
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

    if (feeds.length === 0) {
      return {
        cursor: '',
        feedItems: feeds
      };
    }
    const lastFeed = feeds[feeds.length - 1];
    const cursorDate = lastFeed && lastFeed.feed && lastFeed.feed.createdAt;
    const cursorDateType = objToDate(cursorDate);
    const dateDBISOString = dateToISO(cursorDateType);

    const ret = {
      cursor: dateDBISOString,
      feedItems: feeds
    };
    return ret;
  },
  userFeeds: async (
    _,
    { first, cursor, email: useremail }: QueryUserFeedsArgs,
    { req }
  ): Promise<any> => {
    isAuthenticated(req);
    const result = await requestDB(MATCH_USER_FEEDS, {
      cursor,
      first,
      useremail
    });

    const feeds = parseResultRecords(result);

    if (feeds.length === 0) {
      return {
        cursor: '',
        feedItems: feeds
      };
    }

    const lastFeed = feeds[feeds.length - 1];
    const cursorDate = lastFeed && lastFeed.feed && lastFeed.feed.createdAt;
    const cursorDateType = objToDate(cursorDate);
    const dateDBISOString = dateToISO(cursorDateType);

    const ret = {
      cursor: dateDBISOString,
      feedItems: feeds
    };
    return ret;
  },
  feed: async (_, { feedId }: QueryFeedArgs, { req }): Promise<IFeed> => {
    isAuthenticated(req);
    const userEmail = req.email;

    const feed = await requestDB(GET_NEW_FEED, {
      feedId,
      userEmail
    });

    const [parsedFeed] = parseResultRecords(feed);

    return parsedFeed;
  }
};

export default queryResolvers;
