import { requestQueryWithToken } from '../../util/utils';
import { SEND_FRIEND_MUTATION } from './friend.query';

export function acceptFriendRequest(user1, user2) {
  return requestQueryWithToken(
    user1.token,
    SEND_FRIEND_MUTATION(user2.email, 'REQUESTED_FROM')
  );
}

export function sendFriendRequest(user1, user2) {
  return requestQueryWithToken(
    user1.token,
    SEND_FRIEND_MUTATION(user2.email, 'NONE')
  );
}
