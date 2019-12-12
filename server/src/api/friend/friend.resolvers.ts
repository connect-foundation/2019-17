import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery,
  findUserByRequestRelation,
  findUserByNoRelation,
  rejectFriendRequestByEmailQuery
} from '../../schema/friend/query';
import { findUserWithEmailQuery } from '../../schema/user/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords, gatherValuesByKey } from '../../utils/parseData';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

function getQueryByRelation(relation: string) {
  switch (relation) {
    case 'NONE':
      return sendFriendRequestByEmailQuery;
    case 'REQUEST':
      return cancelFriendRequestByEmailQuery;
    case 'REQUESTED_FROM':
      return acceptFriendRequestByEmailQuery;
    default:
      return cancelFriendByEmailQuery;
  }
}

async function getUserInfoByEmail(email: string) {
  const user = await requestDB(findUserWithEmailQuery, { email });
  return user[0].get(0).properties;
}

export default {
  Query: {
    requestAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const reqUsers = await requestDB(findUserByRequestRelation, {
        email: req.email
      });

      const parsedReq = parseResultRecords(reqUsers);

      return gatherValuesByKey(parsedReq, 'u');
    },
    recommendAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const recUsers = await requestDB(findUserByNoRelation, {
        email: req.email
      });

      const parsedRec = parseResultRecords(recUsers);

      return gatherValuesByKey(parsedRec, 'target');
    }
  },

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

      await requestDB(rejectFriendRequestByEmailQuery, {
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
