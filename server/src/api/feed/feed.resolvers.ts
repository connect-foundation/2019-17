import db from '../../db';
import { MATCH_FEEDS, UPDATE_LIKE, DELETE_LIKE } from '../../schema/feed/query';
import { ParseResultRecords } from '../../utils/parseData';
import console = require('console');

const session = db.session();

interface IPageParam {
  first: number;
  after: number;
  cursor: string;
}
// property로 조회할 때

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
    return true;
  }
  return false;
};
const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

export default {
  Query: {
    feedItems: async (
      _,
      { first, cursor = DEFAUT_MAX_DATE }: IPageParam,
      { req }
    ) => {
      console.log('---cursor1 ', cursor);
      let useremail = '';
      if (checkReqUserEmail(req)) {
        useremail = req.user.email;
      }
      useremail = req.user.email;
      const result = await session.run(MATCH_FEEDS, {
        cursor,
        first,
        useremail
      });
      return ParseResultRecords(result.records);
    }
  },

  Mutation: {
    updateLike: async (_, { feedId, count }, { req }) => {
      let useremail = '';
      if (checkReqUserEmail(req)) {
        useremail = req.user.email;
      }

      const UPDATE_QUERY = getUpdateLikeQuery(count);
      const result = await session.run(UPDATE_QUERY, {
        useremail,
        feedId
      });

      console.log('result: ', result);
      return true;
    }
  }
};
