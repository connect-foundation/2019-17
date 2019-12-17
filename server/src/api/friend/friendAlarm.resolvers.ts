import { withFilter } from 'graphql-subscriptions';
import { requestDB } from '../../utils/requestDB';
import {
  CHANGE_ALL_REQUEST_READ_STATE_BY_EMAIL,
  COUNT_UNREAD_REQUEST_BY_EMAIL,
  FIND_USER_BY_REQUEST_RELATION,
  FIND_USER_BY_NO_RELATION
} from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseData';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export default {
  Query: {
    requestAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const reqUsers = await requestDB(FIND_USER_BY_REQUEST_RELATION, {
        email: req.email
      });

      const parsedReq = parseResultRecords(reqUsers);

      return parsedReq[0].user;
    },
    recommendAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const recUsers = await requestDB(FIND_USER_BY_NO_RELATION, {
        email: req.email
      });

      const parsedRec = parseResultRecords(recUsers);

      return parsedRec[0].target;
    },

    friendUnreadAlarmNum: async (_, __, { req }) => {
      isAuthenticated(req);

      const countRes = await requestDB(COUNT_UNREAD_REQUEST_BY_EMAIL, {
        email: req.email
      });

      return String(countRes[0].get(0));
    }
  },

  Mutation: {
    changeAllRequestReadState: async (_, __, { req }) => {
      isAuthenticated(req);

      await requestDB(CHANGE_ALL_REQUEST_READ_STATE_BY_EMAIL, {
        email: req.email
      });

      return true;
    }
  },

  Subscription: {
    requestAlarmAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator(REQUEST_ALARM_ADDED);
        },
        async (payload, _, { email }) =>
          payload.requestAlarmAdded.targetEmail === email
      )
    }
  }
};
