import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery,
  findUserByRequestRelation,
  findUserByNoRelation,
  changeAllRequestReadStateByEmailQuery,
  countUnreadRequestByEmailQuery
} from '../../schema/friend/query';
import { findUserWithEmailQuery } from '../../schema/user/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords, gatherValuesByKey } from '../../utils/parseData';
import { withFilter } from 'graphql-subscriptions';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';
const FRD_ALARM_NUM_CHANGED = 'FRD_ALARM_NUM_CHANGED';

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
    },
    friendUnreadAlarmNum: async (_, __, { req }) => {
      isAuthenticated(req);

      const countRes = await requestDB(countUnreadRequestByEmailQuery, {
        email: req.email
      });

      return String(countRes[0].get(0));
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
            targetEmail
          }
        });

        pubsub.publish(FRD_ALARM_NUM_CHANGED, {
          friendAlarmNumChanged: {
            targetEmail,
            difference: 1
          }
        });
      } else if (relation === 'REQUEST') {
        pubsub.publish(FRD_ALARM_NUM_CHANGED, {
          friendAlarmNumChanged: {
            targetEmail,
            difference: -1
          }
        });
      }

      return true;
    },
    changeAllRequestReadState: async (_, __, { req }) => {
      isAuthenticated(req);

      await requestDB(changeAllRequestReadStateByEmailQuery, {
        email: req.email
      });

      return true;
    }
  },
  Subscription: {
    requestAlarmAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          console.log('published');
          return pubsub.asyncIterator(REQUEST_ALARM_ADDED);
        },
        async (payload, _, { email }) =>
          payload.requestAlarmAdded.targetEmail === email
      )
    },
    friendAlarmNumChanged: {
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          console.log('published3');
          return pubsub.asyncIterator(FRD_ALARM_NUM_CHANGED);
        },
        async (payload, _, { email }) =>
          payload.friendAlarmNumChanged.targetEmail === email
      )
    }
  }
};
