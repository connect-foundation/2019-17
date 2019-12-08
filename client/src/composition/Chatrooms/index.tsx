import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';
import NewChatRoom from './NewChatRoom';

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
  return (
    <Container>
      <ChatRoom />
      <NewChatRoom />
    </Container>
  );
}

export default ChatRooms;
