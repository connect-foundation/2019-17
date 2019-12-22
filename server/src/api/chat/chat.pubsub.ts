import { CHAT_PUBSUB, MESSAGE_TAB } from './constant';
import { requestDB } from '../../utils/requestDB';
import { GET_USERS_ON_CHAT_ROOM_QUERY } from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseDB';

export const publishToMessageTab = async ({ pubsub, chatRoomId, chat }) => {
  const userResults = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId: Number(chatRoomId)
  });
  const { users } = parseResultRecords(userResults)[0];
  await pubsub.publish(MESSAGE_TAB, {
    getChatRooms: { otherUser: users, lastChat: chat }
  });
};

export const publishChat = async ({ chat, chatRoomId, pubsub }) => {
  await pubsub.publish(CHAT_PUBSUB + chatRoomId, {
    getChatsByChatRoomId: chat
  });
  await publishToMessageTab({ pubsub, chatRoomId, chat });
};
