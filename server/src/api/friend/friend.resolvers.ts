import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { createRelationWithEmailQuery } from '../../schema/friend/query';
import { checkReqUserEmail } from 'src/utils/context';

export default {
  Mutation: {
    requestFriend: async (
      _,
      { targetEmail }: MutationRequestFriendArgs,
      { req }
    ) => {
      checkReqUserEmail(req);

      await requestDB(createRelationWithEmailQuery, {
        email: req.email,
        targetEmail
      });

      return true;
    }
  }
};
