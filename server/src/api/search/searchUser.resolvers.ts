import { QuerySearchUserArgs, UserInfo } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { findUserAndRelationByNicknameWithoutMeQuery } from '../../schema/user/query';
import { checkReqUserEmail } from '../../utils/context';
import { parseResultRecords } from '../../utils/parseData';

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs, { req }) => {
      checkReqUserEmail(req);

      const allUser = await requestDB(
        findUserAndRelationByNicknameWithoutMeQuery,
        {
          nickname: `${keyword}.*`,
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
