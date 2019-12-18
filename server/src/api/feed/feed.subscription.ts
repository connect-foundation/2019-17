import { withFilter } from 'graphql-subscriptions';
import { checkIsFriend } from './checkFunction';
import { NEW_USER_FEED, NEW_FEED } from './constant';

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
  },
  userFeeds: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER_FEED),
      (payload, { userEmail }) =>
        payload.userFeeds.feedItems[0].searchUser.email === userEmail
    )
  }
};

export default subscriptionResolvers;
