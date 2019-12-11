import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  SEND_FRIEND_REQUEST_BY_EMAIL_QUERY,
  ACCEPT_FRIEND_REQUEST_BY_EMAIL_QUERY,
  CANCEL_FRIEND_REQUEST_BY_EMAIL_QUERY,
  CANCEL_FRIEND_EMAIL_QUERY
} from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';

function getQueryByRelation(relation: string) {
  if (relation === 'NONE') {
    return SEND_FRIEND_REQUEST_BY_EMAIL_QUERY;
  } else if (relation === 'REQUEST') {
    return CANCEL_FRIEND_REQUEST_BY_EMAIL_QUERY;
  } else if (relation === 'REQUESTED_FROM') {
    return ACCEPT_FRIEND_REQUEST_BY_EMAIL_QUERY;
  } else {
    return CANCEL_FRIEND_EMAIL_QUERY;
  }
}

export default {
  Mutation: {
    requestFriend: async (
      _,
      { targetEmail, relation }: MutationRequestFriendArgs,
      { req }
    ) => {
      isAuthenticated(req);

      await requestDB(getQueryByRelation(relation), {
        email: req.email,
        targetEmail
      });

      return true;
    }
  }
};
