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
  CREATE_CHAT_ROOM_QUERY,
  CREATE_CHAT_QUERY
} from '../../schema/chat/query';
import { parseResultRecords } from '../../utils/parseData';

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req }
  ): Promise<Chat[]> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const result = await requestDB(CREATE_CHAT_ROOM_QUERY, {
        userEmail1: email,
        userEmail2: userEmail,
        content
      });
      const [parsedResult] = parseResultRecords(result);
      const chats: Chat[] = parsedResult.chats;
      return chats;
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
