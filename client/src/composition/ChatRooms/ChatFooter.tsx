import React from 'react';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import { useCreateChatMutation } from 'react-components.d';

const Footer = styled.div`
  height: 3rem;
  border-top: 1.5px solid rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0.25rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 1rem;
  &::placeholder {
    font-size: 0.875rem;
  }
`;

function ChatFooter({ chatRoomId }: { chatRoomId: number }) {
  const { value: content, onChange, setValue } = useInput('');
  const [createChatMutation] = useCreateChatMutation();
  let overlapFlag = false;
  const onChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (overlapFlag || !content) return;
      overlapFlag = true;
      createChatMutation({ variables: { chatRoomId, content } });
      setValue('');
      overlapFlag = false;
    }
  };

  return (
    <Footer>
      <Input
        placeholder={'메세지를 입력하세요...'}
        maxLength={500}
        onKeyUp={onChatSubmit}
        onChange={onChange}
        value={content}
      />
    </Footer>
  );
}

export default ChatFooter;
