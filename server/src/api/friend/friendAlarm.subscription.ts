import { withFilter } from 'graphql-subscriptions';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export const Subscription = {
  requestAlarmAdded: {
    subscribe: withFilter(
      (_, __, { pubsub }) => {
        return pubsub.asyncIterator(REQUEST_ALARM_ADDED);
      },
      async (payload, _, { email }) =>
        payload.requestAlarmAdded.targetEmail === email
    )
  }
};
