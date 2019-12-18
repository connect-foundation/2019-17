import { withFilter } from 'graphql-subscriptions';
import { checkIsFriend } from './checkFunction';

const NEW_FEED = 'NEW_FEED_PUBSUB';

const subscriptionResolvers = {
  feeds: {
    subscribe: withFilter(
      (_, __, { pubsub }) => {
        return pubsub.asyncIterator(NEW_FEED);
      },
      async (payload, _, context) => {
        const myEmail = context.email;
        const friendEmail = payload.feeds.feedItems[0].searchUser.email;
        const isFriend = await checkIsFriend(friendEmail, myEmail);

        if (isFriend || myEmail === friendEmail) {
          return true;
        } else {
          return false;
        }
      }
    )
  }
};

export default subscriptionResolvers;
