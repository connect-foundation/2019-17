import { withFilter } from 'graphql-subscriptions';
import { SubscriptionGetChatsByChatRoomIdArgs } from '../../types';
import { CHAT_PUBSUB } from './constant';
import { filterChatRoomUser } from './filterFunction';

const Subscription = {
  getChatsByChatRoomId: {
    subscribe: withFilter(
      (_, { chatRoomId }: SubscriptionGetChatsByChatRoomIdArgs, { pubsub }) =>
        pubsub.asyncIterator(CHAT_PUBSUB + chatRoomId),
      async (payload, _, context) => {
        const { email } = context;
        const {
          getChatsByChatRoomId: { chatRoomId }
        } = payload;
        return filterChatRoomUser({ chatRoomId, email });
      }
    )
  }
};

export default Subscription;
