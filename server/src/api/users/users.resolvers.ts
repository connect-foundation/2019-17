import { withFilter } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import { loginChannel, logoutChannel } from '../../utils/channels';
import { requestDB } from '../../utils/requestDB';
import { findFriendsQuery } from '../../schema/user/query';
import { parseNodeResult } from '../../utils/parseDB';
import { socketCountWithEmail } from '../../utils/socketManager';
import { logoutPublish, loginPublish } from '../../utils/pubsub';
import { getUserWithStatus } from '../../schema/user/user';

export const publishLoginUser = gql`
  query {
    loginUser {
      id
      email
      nickname
      thumbnail
      status
    }
  }
`;
export const publishLogoutUser = gql`
  query {
    logoutUser {
      id
      email
      nickname
      thumbnail
      status
    }
  }
`;

export default {
  Query: {
    loginUser: async (_, __, { req }) => {
      const user = await getUserWithStatus(req.email, 'online');
      loginPublish(user);
    },
    logoutUser: async (_, __, { req, pubsub }) => {
      const user = await getUserWithStatus(req.email, 'offline');
      logoutPublish(user);
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
