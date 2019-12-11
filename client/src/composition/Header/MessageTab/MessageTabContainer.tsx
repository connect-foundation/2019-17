import React, { useEffect } from 'react';
import MessageTabPresenter from './MessageTabPresenter';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { useHeaderTabDispatch } from 'stores/HeaderTabContext';
import { CHAT_ROOM } from '../../../constants';
import { useGetChatRoomsQuery, useMeQuery } from 'react-components.d';
import { GET_CHATROOMS_SUBSCRIPTION } from './MessageTab.query';

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
  const {
    data: { getChatRooms = null } = {},
    subscribeToMore
  } = useGetChatRoomsQuery();

  const subscribeToChatRoom = () => {
    return subscribeToMore({
      document: GET_CHATROOMS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const {
          data: { getChatRooms }
        } = subscriptionData;
        if (!prev.getChatRooms || !getChatRooms) return prev;
        const {
          lastChat: { chatRoomId }
        } = getChatRooms as any;
        const prevChatRooms: any = prev.getChatRooms.filter(
          chatRoom => chatRoom && chatRoom.lastChat.chatRoomId !== chatRoomId
        );
        return Object.assign({}, prev, {
          getChatRooms: [getChatRooms, ...prevChatRooms]
        });
      }
    });
  };

  useEffect(() => subscribeToChatRoom());

  return (
    <MessageTabPresenter
      onClickNewMessage={onClickNewMessage}
      chatRooms={getChatRooms}
      userEmail={(me && me.email) || ''}
    />
  );
}

export default MessageTabContainer;
