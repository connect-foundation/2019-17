import {
  MutationResolvers,
  MutationCreateChatRoomArgs,
  Chat
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CHECK_CHAT_ROOM_QUERY,
  CREATE_CHAT_ROOM_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseDB';
import { publishChat, publishToMessageTab } from './chat.pubsub';
import { createChat } from './common';

const Mutation: MutationResolvers = {
  createChatRoom: async (
    _,
    { userEmail, content }: MutationCreateChatRoomArgs,
    { req, pubsub }
  ): Promise<number> => {
    isAuthenticated(req);
    const { email } = req;
    const checkChatRoomResult = await requestDB(CHECK_CHAT_ROOM_QUERY, {
      chatMemberEmail1: email,
      chatMemberEmail2: userEmail
    });

    if (checkChatRoomResult.length) {
      const [{ chatRoomId }] = parseResultRecords(checkChatRoomResult);
      const chat = await createChat({
        email,
        chatRoomId: Number(chatRoomId),
        content
      });
      await publishChat({ chat, chatRoomId: Number(chatRoomId), pubsub });
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
  }
};

export default Mutation;
