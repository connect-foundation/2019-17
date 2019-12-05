import { withFilter } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import { loginChannel, logoutChannel } from '../../utils/channels';

export const publishLoginUser = gql`
  query {
    loginUser
  }
`;
export const publishLogoutUser = gql`
  query {
    logoutUser
  }
`;

export default {
  Query: {
    loginUser: (_, __, { req, pubsub }) => {
      pubsub.publish(loginChannel, req.email);
    },
    logoutUser: (_, __, { req, pubsub }) => {
      pubsub.publish(logoutChannel, req.email);
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
          return email ? payload !== email : false;
        }
      )
    },
    logout: {
      resolve: payload => {
        return payload;
      },
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator([logoutChannel]);
      }
    }
  }
};
