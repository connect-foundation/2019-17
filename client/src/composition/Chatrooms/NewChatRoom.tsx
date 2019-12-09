import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';

const Container = styled.div`
  width: 20rem;
  background-color: white;
  min-height: 23rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
`;

const NewFriends = styled.div`
  height: 2rem;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textColor};
`;

const Input = styled.input`
  font-size: 1rem;
  border: none;
  width: 75%;
  margin-left: 0.25rem;
`;

function NewChatRoom({ idx }: { idx: number }) {
  const chatRoomDispatch = useChatRoomDispatch();
  const onClose = () => {
    chatRoomDispatch({ type: 'DELETE_CHATROOM', idx });
  };
  return (
    <Container>
      <ChatHeader
        nickname="새 메세지"
        isProfile={false}
        btncolor={'blue'}
        onClose={onClose}
      />
      <NewFriends>
        <Text>받는 사람 : </Text>
        <Input />
      </NewFriends>
    </Container>
  );
}

export default NewChatRoom;
