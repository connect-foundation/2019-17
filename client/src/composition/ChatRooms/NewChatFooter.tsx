import React from 'react';
import styled from 'styled-components';
import CommonFooter from 'composition/Header/CommonFooter';
import useInput from 'hooks/useInput';

const ChatFooter = styled(CommonFooter)`
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  font-size: 1rem;
  border: none;
  width: 75%;
  margin-left: 0.25rem;
  &::placeholder {
    font-size: 0.875rem;
  }
`;

function NewChatFooter() {
  const { value: chat, onChange: onChangeChat } = useInput('');
  return (
    <ChatFooter>
      <ChatInput placeholder="메세지..." value={chat} onChange={onChangeChat} />
    </ChatFooter>
  );
}

export default NewChatFooter;
