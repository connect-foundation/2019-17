import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery
} from '../../schema/friend/query';
import { checkReqUserEmail } from '../../utils/context';

function getQueryByRelation(relation: string) {
  if (relation === 'NONE') {
    return sendFriendRequestByEmailQuery;
  } else if (relation === 'REQUEST') {
    return cancelFriendRequestByEmailQuery;
  } else if (relation === 'REQUESTED_FROM') {
    return acceptFriendRequestByEmailQuery;
  } else {
    return cancelFriendByEmailQuery;
  }
}

export default {
  Mutation: {
    requestFriend: async (
      _,
      { targetEmail, relation }: MutationRequestFriendArgs,
      { req }
    ) => {
      checkReqUserEmail(req);

      await requestDB(getQueryByRelation(relation), {
        email: req.email,
        targetEmail
      });

      return true;
    }
  }
};
