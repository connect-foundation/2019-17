import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';
import NewChatRoom from './NewChatRoom';
import { useChatRoomState, IChatRoom } from 'stores/ChatRoomContext';
import { CHAT_ROOM, DEFAULT } from 'Constants';

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
      {ChatRoomsState.map((chatRoom: IChatRoom, idx) => {
        switch (chatRoom.chatType) {
          case CHAT_ROOM.NEW:
            return <NewChatRoom key={idx} idx={idx} />;
          case CHAT_ROOM.CHAT:
            if (chatRoom.chatRoomId) {
              return (
                <ChatRoom
                  key={
                    chatRoom.otherUserEmail
                      ? chatRoom.otherUserEmail + idx
                      : idx
                  }
                  idx={idx}
                  nickname={chatRoom.nickname || ''}
                  thumbnail={chatRoom.thumbnail || DEFAULT.PROFILE}
                  chatRoomId={chatRoom.chatRoomId}
                />
              );
            }
            return null;
          default:
            return null;
        }
      })}
    </Container>
  );
}

export default ChatRooms;
