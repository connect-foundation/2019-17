import { CREATE_CHAT } from 'composition/ChatRooms/ChatRooms.query';
import { chatRoomId, content } from './mock.data';

export const mocks = [
  {
    request: {
      query: CREATE_CHAT,
      variables: { chatRoomId, content }
    },
    result: {
      data: {
        createChat: true
      }
    }
  }
];
