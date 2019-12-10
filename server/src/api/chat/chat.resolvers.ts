import {
  MutationResolvers,
  MutationCreateChatRoomArgs,
  Chat,
  MutationCreateChatArgs,
  QueryResolvers,
  QueryGetChatRoomsArgs,
  ChatRoom,
  QueryGetChatsByChatRoomIdArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CREATE_CHAT_QUERY,
  CHECK_CHAT_ROOM_QUERY,
  CREATE_CHAT_ROOM_QUERY,
  GET_CHATS_QUERY,
  GET_CHATS_BY_CHAT_ROOM_ID_QUERY,
  GET_CHATROOMS_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';
const CHAT_LIMIT = 20;

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req }
  ): Promise<Chat[]> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const checkChatRoomResult = await requestDB(CHECK_CHAT_ROOM_QUERY, {
        userEmail1: email,
        userEmail2: userEmail
      });
      const [isChatRoom] = parseResultRecords(checkChatRoomResult);
      if (!isChatRoom) {
        const result = await requestDB(CREATE_CHAT_ROOM_QUERY, {
          from: email,
          to: userEmail,
          content
        });
        const chats: Chat[] = parseResultRecords(result)[0].chats;
        return chats;
      }
      const chatResults = await requestDB(GET_CHATS_QUERY, {
        userEmail1: email,
        userEmail2: userEmail,
        cursor: DEFAUT_MAX_DATE,
        limit: CHAT_LIMIT
      });
      const parsedChatResults: Chat[] = parseResultRecords(chatResults)[0]
        .chats;
      return parsedChatResults;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  createChat: async (
    _,
    { chatRoomId, content }: MutationCreateChatArgs,
    { req }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      await requestDB(CREATE_CHAT_QUERY, { email, content, chatRoomId });
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
      const chats: Chat[] = parseResultRecords(result)[0].chats;
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
        cursor,
        limit: CHAT_LIMIT
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

export default {
  Query,
  Mutation
};
