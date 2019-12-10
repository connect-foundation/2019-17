import {
  MutationResolvers,
  MutationCreateChatRoomArgs,
  Chat,
  MutationCreateChatArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CREATE_CHAT_QUERY,
  CHECK_CHAT_ROOM_QUERY,
  CREATE_CHAT_ROOM_QUERY,
  GET_CHATS_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';
const CHAT_LIMIT = 20;

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req }
  ): Promise<Chat[] | null> => {
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

export default {
  Mutation
};