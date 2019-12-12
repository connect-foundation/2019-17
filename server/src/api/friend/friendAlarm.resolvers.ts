import { requestDB } from '../../utils/requestDB';
import {
  changeAllRequestReadStateByEmailQuery,
  countUnreadRequestByEmailQuery
} from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { withFilter } from 'graphql-subscriptions';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export default {
  Query: {
    friendUnreadAlarmNum: async (_, __, { req }) => {
      isAuthenticated(req);

      const countRes = await requestDB(countUnreadRequestByEmailQuery, {
        email: req.email
      });

      return String(countRes[0].get(0));
    }
  },

  Mutation: {
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
          return pubsub.asyncIterator(REQUEST_ALARM_ADDED);
        },
        async (payload, _, { email }) =>
          payload.requestAlarmAdded.targetEmail === email
      )
    }
  }
};
