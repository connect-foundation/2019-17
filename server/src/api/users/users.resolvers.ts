import { withFilter } from 'graphql-subscriptions';
import { loginChannel, logoutChannel } from '../../utils/channels';
import { requestDB } from '../../utils/requestDB';
import { findFriendsQuery } from '../../schema/user/query';
import { parseNodeResult } from '../../utils/parseDB';
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
        (payload, _, { email }) => {
          return email ? payload.email !== email : false;
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
        (payload, _, { email }) => {
          return email ? payload.email !== email : false;
        }
      )
    }
  }
};
