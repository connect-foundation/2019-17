import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery,
  findUserByRequestRelation,
  findUserByNoRelation
} from '../../schema/friend/query';
import { findUserWithEmailQuery } from '../../schema/user/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords, gatherValuesByKey } from '../../utils/parseData';
import { withFilter } from 'graphql-subscriptions';

const FRD_ALARM_ADDED = 'FRD_ALARM_ADDED';

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

async function getUserInfoByEmail(email: string) {
  const user = await requestDB(findUserWithEmailQuery, { email });
  return user[0].get(0).properties;
}

export default {
  Query: {
    getReqAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const reqUsers = await requestDB(findUserByRequestRelation, {
        email: req.email
      });

      const parsedReq = parseResultRecords(reqUsers);

      return gatherValuesByKey(parsedReq, 'u');
    },
    getRecAlarm: async (_, __, { req }) => {
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

      if (getQueryByRelation(relation) === sendFriendRequestByEmailQuery) {
        const user = await getUserInfoByEmail(req.email);

        pubsub.publish(FRD_ALARM_ADDED, {
          friendAlarmAdded: {
            ...user,
            targetEmail
          }
        });
      }

      return true;
    }
  },
  Subscription: {
    friendAlarmAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          console.log('published');
          return pubsub.asyncIterator(FRD_ALARM_ADDED);
        },
        async (payload, _, { email }) =>
          payload.friendAlarmAdded.targetEmail === email
      )
    }
  }
};
