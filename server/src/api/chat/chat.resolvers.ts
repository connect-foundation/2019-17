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
  CHECK_CHAT_ROOM,
  CREATE_CHAT_ROOM_QUERY
} from '../../schema/chat/query';
import { parseResultRecords } from '../../utils/parseData';

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req }
  ): Promise<Chat[] | null> => {
    isAuthenticated(req);
    const { email } = req;
    try {
      const isChatRoom = await requestDB(CHECK_CHAT_ROOM, {
        userEmail1: email,
        userEmail2: userEmail
      });
      const [parsedResult] = parseResultRecords(isChatRoom);
      if (!parsedResult) {
        const result = await requestDB(CREATE_CHAT_ROOM_QUERY, {
          from: email,
          to: userEmail,
          content
        });
        const chats: Chat[] = parseResultRecords(result)[0].chats;
        return chats;
      }
      return null;
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
