import { withFilter } from 'graphql-subscriptions';
import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from '../auth/constants';
import { requestDB } from '../../utils/requestDB';
import { CHECK_FRIEND_QUERY } from '../../schema/user/query';
import { getNode } from '../../utils/parseData';

const subscriptionResolver = {
  updateUserState: {
    resolve: payload => payload,
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
};

export default subscriptionResolver;
