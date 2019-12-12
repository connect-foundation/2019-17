import {
  MutationResolvers,
  MutationCreateChatRoomArgs,
  Chat,
  MutationCreateChatArgs,
  QueryResolvers,
  QueryGetChatRoomsArgs,
  ChatRoom,
  QueryGetChatsByChatRoomIdArgs,
  SubscriptionGetChatsByChatRoomIdArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CREATE_CHAT_QUERY,
  CHECK_CHAT_ROOM_QUERY,
  CREATE_CHAT_ROOM_QUERY,
  GET_CHATS_BY_CHAT_ROOM_ID_QUERY,
  GET_CHATROOMS_QUERY,
  GET_USERS_ON_CHAT_ROOM_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { withFilter } from 'graphql-subscriptions';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';
const CHAT_LIMIT = 20;
const CHAT_PUBSUB = 'chatPubsub';
const MESSAGE_TAB = 'messageTab';

const publishToMessageTab = async ({ pubsub, chatRoomId, chat }) => {
  const userResults = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId
  });
  const { users } = parseResultRecords(userResults)[0];
  pubsub.publish(MESSAGE_TAB, {
    getChatRooms: { otherUser: users, lastChat: chat }
  });
};

const filterChatRoomUser = async ({ chatRoomId, email }) => {
  const result = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId: parseInt(chatRoomId, 10)
  });
  const users = parseResultRecords(result)[0].users;

  return users.some(user => user.email === email);
};

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req, pubsub }
  ): Promise<Chat[]> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const checkChatRoomResult = await requestDB(CHECK_CHAT_ROOM_QUERY, {
        userEmail1: email,
        userEmail2: userEmail
      });
      if (checkChatRoomResult.length === 0) {
        const result = await requestDB(CREATE_CHAT_ROOM_QUERY, {
          from: email,
          to: userEmail,
          content
        });
        const chats: Chat[] = parseResultRecords(result)[0].chats;
        const chat: Chat = chats[0];
        publishToMessageTab({
          pubsub,
          chatRoomId: chat.chatRoomId,
          chat
        });
        return chats;
      }
      const [{ chatRoomId }] = parseResultRecords(checkChatRoomResult);
      const result = await requestDB(CREATE_CHAT_QUERY, {
        email,
        content,
        chatRoomId: parseInt(chatRoomId, 10)
      });
      const chats: Chat[] = parseResultRecords(result)[0].chat;
      pubsub.publish(CHAT_PUBSUB + chatRoomId, {
        getChatsByChatRoomId: chats[0]
      });
      publishToMessageTab({
        pubsub,
        chatRoomId: parseInt(chatRoomId, 10),
        chat: chats[0]
      });
      return chats;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  createChat: async (
    _,
    { chatRoomId, content }: MutationCreateChatArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const result = await requestDB(CREATE_CHAT_QUERY, {
        email,
        content,
        chatRoomId
      });
      const [chat]: Chat[] = parseResultRecords(result)[0].chat;
      pubsub.publish(CHAT_PUBSUB + chatRoomId, {
        getChatsByChatRoomId: chat
      });
      publishToMessageTab({ pubsub, chatRoomId, chat });
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
      console.log({
        chatRoomId,
        cursor,
        limit: CHAT_LIMIT
      });
      const chats: Chat[] = parseResultRecords(result)[0].chats;
      console.log(chats.length);
      return chats;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  getChatRooms: async (
    _,
    { cursor = DEFAUT_MAX_DATE }: QueryGetChatRoomsArgs,
    { req }
  ): Promise<ChatRoom[]> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const result = await requestDB(GET_CHATROOMS_QUERY, {
        email,
        cursor
      });
      const parsedResults = parseResultRecords(result);
      const chatRooms: ChatRoom[] = parsedResults.map(
        ({ otherUser, lastChat }) => ({ otherUser, lastChat: lastChat[0] })
      );
      return chatRooms;
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
  },
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

export default {
  Query,
  Mutation,
  Subscription
};
