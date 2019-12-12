import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import { useCreateChatMutation } from 'react-components.d';

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

function ChatFooter({
  chatRoomId,
  chatBody
}: {
  chatRoomId: number;
  chatBody: React.MutableRefObject<null>;
}) {
  const { value: content, onChange, setValue } = useInput('');
  const contentCursor = useRef<HTMLInputElement>(null);
  const [createChatMutation] = useCreateChatMutation();
  let overlapFlag = false;
  const onChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (overlapFlag || !content) return;
    overlapFlag = true;
    createChatMutation({ variables: { chatRoomId, content } });
    setValue('');
    overlapFlag = false;
    scrollDown(chatBody);
  };

  useEffect(() => {
    if (contentCursor.current) {
      const len = contentCursor.current.value.length;
      contentCursor.current.focus();
      contentCursor.current.setSelectionRange(len, len);
    }
  }, []);

  return (
    <Footer onSubmit={onChatSubmit}>
      <Input
        placeholder={'메세지를 입력하세요...'}
        maxLength={500}
        onChange={onChange}
        value={content}
        ref={contentCursor}
      />
    </Footer>
  );
}

export default ChatFooter;
