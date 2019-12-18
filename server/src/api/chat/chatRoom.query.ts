import {
  Chat,
  QueryResolvers,
  QueryGetChatsByChatRoomIdArgs,
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  GET_CHATS_BY_CHAT_ROOM_ID_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { DEFAUT_MAX_DATE, CHAT_LIMIT } from './constant';

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

export default Query;
