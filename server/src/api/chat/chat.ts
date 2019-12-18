import { requestDB } from '../../utils/requestDB';
import { parseResultRecords } from '../../utils/parseData';
import { GET_USERS_ON_CHAT_ROOM_QUERY } from 'src/schema/chat/chatQuery';

export const filterChatRoomUser = async ({ chatRoomId, email }) => {
  const result = await requestDB(GET_USERS_ON_CHAT_ROOM_QUERY, {
    chatRoomId: Number(chatRoomId)
  });
  const users = parseResultRecords(result)[0].users;
  return users.some(user => user.email === email);
};
