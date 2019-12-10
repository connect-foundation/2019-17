import { withFilter } from 'graphql-subscriptions';
import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from '../../utils/channels';
import { requestDB } from '../../utils/requestDB';
import {
  FIND_FRIENDS_QUERY,
  CHECK_FRIEND_QUERY
} from '../../schema/user/query';
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
      const result = await requestDB(FIND_FRIENDS_QUERY, {
        email: req.email
      });
      const friends = await parseNodeResult(result).map(user => {
        const { email } = user;
        user.status = socketCountWithEmail.has(email) ? 'online' : 'offline';
        return user;
      });
      return friends;
    }
  },
  Subscription: {
    updateUserState: {
      resolve: payload => {
        return payload;
      },
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator([LOGIN_CHANNEL, LOGOUT_CHANNEL]);
        },
        async (payload, _, { email }) => {
          const result = await requestDB(CHECK_FRIEND_QUERY, {
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
