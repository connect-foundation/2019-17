import { withFilter } from 'graphql-subscriptions';
import { loginChannel, logoutChannel } from '../../utils/channels';
import { requestDB } from '../../utils/requestDB';
import { findFriendsQuery, checkFriendQuery } from '../../schema/user/query';
import { parseNodeResult, getNode } from '../../utils/parseDB';
import { socketCountWithEmail } from '../../utils/socketManager';
import { loginPublish } from '../../utils/pubsub';
import { getUserWithStatus } from '../../schema/user/user';

export default {
  Query: {
    loginUser: async (_, __, { req }) => {
      const user = await getUserWithStatus(req.email, 'online');
      loginPublish(user);
    },
    friends: async (_, __, { req }) => {
      const result = await requestDB(findFriendsQuery, {
        email: req.email
      });
      const friends = await parseNodeResult(result).map(e => {
        e.status = socketCountWithEmail.has(e.email) ? 'online' : 'offline';
        return e;
      });
      return friends;
    }
  },
  Subscription: {
    login: {
      resolve: payload => {
        return payload;
      },
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator([loginChannel]);
        },
        async (payload, _, { email }) => {
          const result = await requestDB(checkFriendQuery, {
            email: payload.email,
            friendEmail: email
          });
          const friend = await getNode(result);
          return !!friend;
        }
      )
    },
    logout: {
      resolve: payload => {
        return payload;
      },
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator([logoutChannel]);
        },
        async (payload, _, { email }) => {
          const result = await requestDB(checkFriendQuery, {
            email: payload.email,
            friendEmail: email
          });
          const friend = await getNode(result);
          return !!friend;
        }
      )
    }
  }
};
