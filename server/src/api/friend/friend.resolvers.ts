import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  SEND_FRIEND_REQUEST_BY_EMAIL,
  ACCEPT_FRIEND_REQUEST_BY_EMAIL,
  CANCEL_FRIEND_REQUEST_BY_EMAIL,
  CANCEL_FRIEND_BY_EMAIL,
  REJECT_FRIEND_REQUEST_BY_EMAIL
} from '../../schema/friend/query';
import { FIND_USER_WITH_EMAIL_QUERY } from '../../schema/user/query';
import isAuthenticated from '../../utils/isAuthenticated';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

function getQueryByRelation(relation: string) {
  switch (relation) {
    case 'NONE':
      return SEND_FRIEND_REQUEST_BY_EMAIL;
    case 'REQUEST':
      return CANCEL_FRIEND_REQUEST_BY_EMAIL;
    case 'REQUESTED_FROM':
      return ACCEPT_FRIEND_REQUEST_BY_EMAIL;
    default:
      return CANCEL_FRIEND_BY_EMAIL;
  }
}

async function getUserInfoByEmail(email: string) {
  const user = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
  return user[0].get(0).properties;
}

export default {
  Mutation: {
    requestFriend: async (
      _,
      { targetEmail, relation }: MutationRequestFriendArgs,
      { req, pubsub }
    ) => {
      isAuthenticated(req);

      await requestDB(getQueryByRelation(relation), {
        email: req.email,
        targetEmail
      });

      if (relation === 'NONE') {
        const user = await getUserInfoByEmail(req.email);

        pubsub.publish(REQUEST_ALARM_ADDED, {
          requestAlarmAdded: {
            ...user,
            targetEmail,
            action: 'ADDED'
          }
        });
      } else if (relation === 'REQUEST') {
        const user = await getUserInfoByEmail(req.email);

        pubsub.publish(REQUEST_ALARM_ADDED, {
          requestAlarmAdded: {
            ...user,
            targetEmail,
            action: 'DELETED'
          }
        });
      }

      return true;
    },

    rejectFriendRequest: async (_, { targetEmail }, { req, pubsub }) => {
      isAuthenticated(req);

      await requestDB(REJECT_FRIEND_REQUEST_BY_EMAIL, {
        email: req.email,
        targetEmail
      });

      pubsub.publish(REQUEST_ALARM_ADDED, {
        requestAlarmAdded: {
          nickname: 'deletedUser',
          email: targetEmail,
          targetEmail: req.email,
          action: 'DELETED'
        }
      });

      return true;
    }
  }
};
