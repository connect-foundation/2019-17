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
  const { value: content, setValue } = useInput('');
  const [createChatMutation] = useCreateChatMutation();
  const onChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      console.log('submit');
      createChatMutation({ variables: { chatRoomId, content } });
      setValue('');
    }
  };
  return (
    <Footer>
      <Input
        placeholder={'메세지를 입력하세요...'}
        maxLength={500}
        onKeyUp={onChatSubmit}
        onChange={e => setValue(e.target.value)}
        value={content}
      />
    </Footer>
  );
}

export default ChatFooter;
