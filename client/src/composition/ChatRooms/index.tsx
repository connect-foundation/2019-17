import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';
import NewChatRoom from './NewChatRoom';
import { useChatRoomState } from 'stores/ChatRoomContext';
import { CHAT_ROOM } from 'Constants';

const Container = styled.div`
  position: fixed;
  right: 250px;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
`;

function ChatRooms() {
  const ChatRoomsState = useChatRoomState();
  return (
    <Container>
      {ChatRoomsState.map((chatRoom, idx) => {
        switch (chatRoom.chatType) {
          case CHAT_ROOM.NEW:
            return <NewChatRoom key={idx} idx={idx} />;
          case CHAT_ROOM.CHAT:
            return (
              <ChatRoom
                key={
                  chatRoom.otherUserEmail ? chatRoom.otherUserEmail + idx : idx
                }
                idx={idx}
                nickname={chatRoom.nickname || ''}
                thumbnail={
                  chatRoom.thumbnail ||
                  process.env.PUBLIC_URL + '/images/profile.png'
                }
                chatRoomId={chatRoom.chatRoomId || 0}
              />
            );
          default:
            return null;
        }
      })}
    </Container>
  );
}

export default ChatRooms;
