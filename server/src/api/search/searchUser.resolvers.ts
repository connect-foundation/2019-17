import { QuerySearchUserArgs, UserInfo } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { findUserAndRelationByNicknameWithoutMeQuery } from '../../schema/user/query';
// import { parseNodeResult } from '../../utils/parseDB';
import { checkReqUserEmail } from '../../utils/context';
import { parseResultRecords } from '../../utils/parseData';

export default {
  Query: {
    searchUser: async (_, { keyword }: QuerySearchUserArgs, { req }) => {
      checkReqUserEmail(req);

      // const hasRelation = await requestDB(findUserByNicknameHasRelationWithMe, {
      //   nickname: `${keyword}.*`,
      //   email: req.email
      // });

      const allUser = await requestDB(
        findUserAndRelationByNicknameWithoutMeQuery,
        {
          nickname: `${keyword}.*`,
          email: req.email
        }
      );

      // const parsedRelationUser = parseResultRecords(hasRelation);
      const parsedAllUser = parseResultRecords(allUser);

      console.log(parsedAllUser);

      const res: UserInfo[] = [];

      parsedAllUser.forEach(user => {
        user.target.relation = user.type;
        res.push(user.target);
        // if (user.type === 'REQUEST') {
        //   user.target.relation = 'REQUEST';
        // } else if (user.type === 'REQUESTED_FROM') {
        //   user.target.relation = 'REQUESTED_FROM';
        // } else {
        //   console.log('none');
        // }
      });

      return res;
    }
  }
};
