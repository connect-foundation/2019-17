import { QuerySearchUserArgs, UserInfo } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY } from '../../schema/user/query';
import { parseResultRecords } from '../../utils/parseData';
import isAuthenticated from '../../utils/isAuthenticated';
import WrongKeywordError from '../../errors/WrongKeywordError';

function checkKeyword(keyword: string) {
  if (!keyword.length || keyword === '?' || keyword.match(/^\\/)) {
    throw new WrongKeywordError();
  }
}

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs, { req }) => {
      checkKeyword(keyword);
      isAuthenticated(req);

      const allUser = await requestDB(
        FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY,
        {
          nickname: `.*${keyword}.*`,
          email: req.email
        }
      );

      const parsedAllUser = parseResultRecords(allUser);

      const res: UserInfo[] = [];

      parsedAllUser.sort((first, second) =>
        first.target.nickname > second.target.nickname ? 1 : -1
      );

      parsedAllUser.forEach(user => {
        user.target.relation = user.type;
        res.push(user.target);
      });

      return res;
    }
  }
};
