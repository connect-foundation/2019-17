import React from 'react';
import MessageTabPresenter from './MessageTabPresenter';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { useHeaderTabDispatch } from 'stores/HeaderTabContext';
import { CHAT_ROOM } from '../../../constants';

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

  return <MessageTabPresenter onClickNewMessage={onClickNewMessage} />;
}

export default MessageTabContainer;
