import { QueryResolvers, QueryGetChatRoomsArgs, ChatRoom } from '../../types';
import { requestDB } from '../../utils/requestDB';
import createDBError from '../../errors/createDBError';
import isAuthenticated from '../../utils/isAuthenticated';
import { GET_CHATROOMS_QUERY } from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { DEFAUT_MAX_DATE } from './constant';

const Query: QueryResolvers = {
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
      if (parsedResults.length === 0) return [];
      const chatRooms: ChatRoom[] = parsedResults.map(
        ({ users, lastChat }) => ({ otherUser: users, lastChat: lastChat[0] })
      );
      return chatRooms;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default Query;
