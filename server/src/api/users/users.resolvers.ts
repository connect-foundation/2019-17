import { withFilter } from 'graphql-subscriptions';
import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from '../../utils/channels';
import { requestDB } from '../../utils/requestDB';
import {
  FIND_USER_WITH_EMAIL_QUERY,
  FIND_FRIENDS_QUERY,
  CHECK_FRIEND_QUERY,
  FIND_RELATIONSHIP_WITH_USER
} from '../../schema/user/query';
import {
  parseNodeResult,
  getNode,
  getFirstKeyValue
} from '../../utils/parseDB';
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
    },
    userWithEmail: async (_, { email }) => {
      const result = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
      const user = await getNode(result);
      return user;
    },
    friendsWithUserEmail: async (_, { email }) => {
      const result = await requestDB(FIND_FRIENDS_QUERY, { email });
      const friends = await parseNodeResult(result);
      return friends;
    },
    findRelation: async (_, { email: userEmail }, { req }) => {
      const result = await requestDB(FIND_RELATIONSHIP_WITH_USER, {
        myEmail: req.email,
        userEmail
      });
      const relation = await getFirstKeyValue(result);
      return relation;
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
