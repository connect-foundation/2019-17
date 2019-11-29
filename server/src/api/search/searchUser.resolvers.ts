import { QuerySearchUserArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { findUserWithNicknameQuery } from '../../schema/user/query';
import { parseNodeResult } from '../../utils/parseDB';

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs) => {
      const result = await requestDB(findUserWithNicknameQuery, {
        nickname: `${keyword}.*`
      });

      return parseNodeResult(result);
    }
  }
};
