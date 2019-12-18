import { CHAT_PUBSUB, MESSAGE_TAB } from './constant';
import { requestDB } from '../../utils/requestDB';
import {
  GET_USERS_ON_CHAT_ROOM_QUERY,
  CREATE_CHAT_QUERY
} from '../../schema/chat/chatQuery';
import { parseResultRecords } from '../../utils/parseData';
import { Chat } from '../../types';

export const publishToMessageTab = async ({ pubsub, chatRoomId, chat }) => {
  const userResults = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId: Number(chatRoomId)
  });
  const { users } = parseResultRecords(userResults)[0];
  pubsub.publish(MESSAGE_TAB, {
    getChatRooms: { otherUser: users, lastChat: chat }
  });
};

export const createChatAndPublish = async ({
  email,
  content,
  chatRoomId,
  pubsub
}) => {
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
  return chat;
};
