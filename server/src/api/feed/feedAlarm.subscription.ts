import { withFilter } from 'graphql-subscriptions';
import { checkIsFriend } from './checkFunction';
const NEW_ALARM = 'NEW_ALARM_PUBSUB';

const subscriptionResolvers = {
  alarms: {
    subscribe: withFilter(
      (_, __, { pubsub }) => {
        return pubsub.asyncIterator(NEW_ALARM);
      },
      async (payload, _, context) => {
        const myEmail = context.email;
        const friendEmail = payload.alarms[0].email;
        const isFriend = await checkIsFriend(friendEmail, myEmail);

        return isFriend;
      }
    )
  }
};

export default subscriptionResolvers;
