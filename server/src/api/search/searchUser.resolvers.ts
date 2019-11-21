import { SearchUserQueryArgs } from '../../types/graph';
import { requestDB } from '../../utils/requestDB';
import { findUserWithNicknameQuery } from '../../schema/user/query';

export default {
  Query: {
    searchUser: async (_, { nickname }: SearchUserQueryArgs) => {
      const result = await requestDB(findUserWithNicknameQuery, {
        nickname: `.*${nickname}.*`
      });

      console.log(result);

      return result;
    }
  }
};
