import { QuerySearchUserArgs, UserWithRelation } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY } from '../../schema/user/query';
import { parseResultRecords } from '../../utils/parseDB';
import isAuthenticated from '../../utils/isAuthenticated';

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs, { req }) => {
      if (!keyword.length || keyword === '?' || keyword.match(/^\\/)) {
        return [];
      }

      isAuthenticated(req);

      const allUser = await requestDB(
        FIND_USER_AND_RELATION_BY_NICKNAME_WITHOUT_ME_QUERY,
        {
          nickname: `.*${keyword}.*`,
          email: req.email
        }
      );

      const parsedAllUser = parseResultRecords(allUser);

      const res: UserWithRelation[] = [];

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
