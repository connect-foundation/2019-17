import React from 'react';
import MessageTabPresenter from './MessageTabPresenter';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { useHeaderTabDispatch } from 'stores/HeaderTabContext';
import { CHAT_ROOM } from '../../../constants';
import gql from 'graphql-tag';
import { useGetChatRoomsQuery, useMeQuery } from 'react-components.d';

export const GET_CHATROOMS_QUERY = gql`
  query getChatRooms {
    getChatRooms {
      otherUser {
        thumbnail
        nickname
      }
      lastChat {
        email
        chatRoomId
        content
        createAt {
          year
          month
          day
          hour
          minute
        }
      }
    }
  }
`;

function MessageTabContainer() {
  const chatRoomDispatch = useChatRoomDispatch();
  const headerTabDispatch = useHeaderTabDispatch();
  const onClickNewMessage = () => {
    headerTabDispatch({ type: 'INITSTATE' });
    chatRoomDispatch({
      type: 'CREATE_CHATROOM',
      chatRoom: { chatType: CHAT_ROOM.NEW }
    });
  };
  const { data: { me = null } = {} } = useMeQuery();
  const { data: { getChatRooms = null } = {} } = useGetChatRoomsQuery();

  return (
    <MessageTabPresenter
      onClickNewMessage={onClickNewMessage}
      chatRooms={getChatRooms}
      userEmail={(me && me.email) || ''}
    />
  );
}

export default MessageTabContainer;
