import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import { useCreateChatMutation } from 'react-components.d';
import { PLACEHOLDER_TEXT } from './constant';

const Footer = styled.form`
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

const scrollDown = (chatBody: any) => {
  chatBody.current.scrollTop = chatBody.current.scrollHeight;
};

interface IProps {
  chatRoomId: number;
  chatBody: React.MutableRefObject<null>;
}

function ChatFooter({ chatRoomId, chatBody }: IProps) {
  const { value: content, onChange, setValue } = useInput('');
  const contentCursor = useRef<HTMLInputElement>(null);
  const [createChatMutation] = useCreateChatMutation();

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChatSubmit();
  };

  const onChatSubmit = _.debounce(() => {
    if (!content) return;
    createChatMutation({ variables: { chatRoomId, content } });
    setValue('');
    scrollDown(chatBody);
  }, 300);

  useEffect(() => {
    if (contentCursor.current) {
      const { length } = contentCursor.current.value;
      contentCursor.current.focus();
      contentCursor.current.setSelectionRange(length, length);
    }
  }, []);

  return (
    <Footer onSubmit={handleChatSubmit} data-testid={'chatFooterForm'}>
      <Input
        placeholder={PLACEHOLDER_TEXT}
        maxLength={500}
        onChange={onChange}
        value={content}
        ref={contentCursor}
      />
    </Footer>
  );
}

export default ChatFooter;
