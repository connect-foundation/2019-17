import { withFilter } from 'graphql-subscriptions';
import {
  MutationResolvers,
  Chat,
  MutationCreateChatArgs,
  QueryResolvers,
  QueryGetChatsByChatRoomIdArgs,
  SubscriptionGetChatsByChatRoomIdArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import { GET_CHATS_BY_CHAT_ROOM_ID_QUERY } from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { createChatAndPublish } from './chat.pubsub';
import { DEFAUT_MAX_DATE, CHAT_LIMIT, CHAT_PUBSUB } from './constant';
import { filterChatRoomUser } from './chat';

const Mutation: MutationResolvers = {
  createChat: async (
    _,
    { chatRoomId, content }: MutationCreateChatArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      await createChatAndPublish({
        email,
        content,
        chatRoomId,
        pubsub
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

const Query: QueryResolvers = {
  getChatsByChatRoomId: async (
    _,
    { chatRoomId, cursor = DEFAUT_MAX_DATE }: QueryGetChatsByChatRoomIdArgs,
    { req }
  ): Promise<Chat[]> => {
    isAuthenticated(req);
    try {
      const result = await requestDB(GET_CHATS_BY_CHAT_ROOM_ID_QUERY, {
        chatRoomId,
        cursor,
        limit: CHAT_LIMIT
      });
      const { chats }: { chats: Chat[] } = parseResultRecords(result)[0];
      return chats;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

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

export default {
  Query,
  Mutation,
  Subscription
};
