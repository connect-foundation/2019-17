import { QuerySearchUserArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { findUserByNicknameQueryWithoutMe } from '../../schema/user/query';
import { parseNodeResult } from '../../utils/parseDB';
import { checkReqUserEmail } from '../../utils/context';

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs, { req }) => {
      checkReqUserEmail(req);

      const result = await requestDB(findUserByNicknameQueryWithoutMe, {
        nickname: `${keyword}.*`,
        email: req.email
      });

      return parseNodeResult(result);
    }
  }
};
