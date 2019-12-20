import { requestDB } from '../../utils/requestDB';
import { parseResultRecords } from '../../utils/parseDB';
import {
  GET_USERS_ON_CHAT_ROOM_QUERY,
  CREATE_CHAT_QUERY
} from '../../schema/chat/chatQuery';
import { Chat } from '../../types';

export const filterChatRoomUser = async ({ chatRoomId, email }) => {
  const result = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId: Number(chatRoomId)
  });
  const users = parseResultRecords(result)[0].users;
  return users.some(user => user.email === email);
};

export const createChat = async ({ email, content, chatRoomId }) => {
  const result = await requestDB(CREATE_CHAT_QUERY, {
    email,
    content,
    chatRoomId
  });
  const [chat]: Chat[] = parseResultRecords(result)[0].chat;
  return chat;
};
