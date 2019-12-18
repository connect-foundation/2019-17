import { withFilter } from 'graphql-subscriptions';
import { MESSAGE_TAB } from './constant';
import { filterChatRoomUser } from './filterFunction';

const Subscription = {
  getChatRooms: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator(MESSAGE_TAB),
      async (payload, _, context) => {
        const { email } = context;
        const {
          lastChat: { chatRoomId }
        } = payload.getChatRooms;
        return filterChatRoomUser({ chatRoomId, email });
      }
    )
  }
};

export default Subscription;
