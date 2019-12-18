import { withFilter } from 'graphql-subscriptions';
import {
  MutationResolvers,
  MutationCreateChatRoomArgs,
  Chat,
  QueryResolvers,
  QueryGetChatsByChatRoomIdArgs,
  SubscriptionGetChatsByChatRoomIdArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CHECK_CHAT_ROOM_QUERY,
  CREATE_CHAT_ROOM_QUERY,
  GET_CHATS_BY_CHAT_ROOM_ID_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { createChatAndPublish, publishToMessageTab } from './chat.pubsub';
import { DEFAUT_MAX_DATE, CHAT_PUBSUB, CHAT_LIMIT } from './constant';
import { filterChatRoomUser } from './chat';

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req, pubsub }
  ): Promise<number> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const checkChatRoomResult = await requestDB(CHECK_CHAT_ROOM_QUERY, {
        chatMemberEmail1: email,
        chatMemberEmail2: userEmail
      });

      if (checkChatRoomResult.length) {
        const [{ chatRoomId }] = parseResultRecords(checkChatRoomResult);
        await createChatAndPublish({
          email,
          content,
          chatRoomId: Number(chatRoomId),
          pubsub
        });
        return chatRoomId;
      }

      const result = await requestDB(CREATE_CHAT_ROOM_QUERY, {
        from: email,
        to: userEmail,
        content
      });
      const { chats }: { chats: Chat[] } = parseResultRecords(result)[0];
      const chat = chats[0];
      publishToMessageTab({
        pubsub,
        chatRoomId: chat.chatRoomId,
        chat
      });
      return chat.chatRoomId;
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
