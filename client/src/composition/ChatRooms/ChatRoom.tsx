import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import gql from 'graphql-tag';
import { useGetChatsByChatRoomIdQuery, useMeQuery } from 'react-components.d';

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

const ChatBody = styled.section`
  height: 17rem;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const MyChat = styled.article`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem;
`;

const MyChatContent = styled.span`
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background-color: ${props => props.theme.colors.messageBgBlue};
  color: white;
  padding: 0.5rem;
`;

const OtherChat = styled.article`
  display: flex;
  align-items: center;
  padding: 0.25rem;
`;

const OtherContent = styled.span`
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${props => props.theme.colors.textColor};
  padding: 0.5rem;
`;

export const GET_CHATS = gql`
  query getChatsByChatRoomId($chatRoomId: Int!) {
    getChatsByChatRoomId(chatRoomId: $chatRoomId) {
      content
      createAt {
        minute
      }
      chatRoomId
      nickname
      thumbnail
      email
    }
  }
`;

interface IProps {
  idx: number;
  nickname: string;
  thumbnail: string;
  chatRoomId: number;
}

function ChatRoom({ idx, chatRoomId, nickname, thumbnail }: IProps) {
  const chatRoomDispatch = useChatRoomDispatch();
  const onClose = () => {
    chatRoomDispatch({ type: 'DELETE_CHATROOM', idx });
  };
  const {
    data: { getChatsByChatRoomId = null } = {},
    loading
  } = useGetChatsByChatRoomIdQuery({
    variables: { chatRoomId }
  });
  const { data: { me = null } = {}, loading: meLoading } = useMeQuery();
  return loading && meLoading ? (
    <div>loading...</div>
  ) : (
    <Container>
      <ChatHeader nickname={nickname} onClose={onClose} thumbnail={thumbnail} />
      <ChatBody>
        {getChatsByChatRoomId &&
          getChatsByChatRoomId.map(({ email, content }: any, idx) =>
            me && email === me.email ? (
              <MyChat key={content + idx}>
                <MyChatContent>{content}</MyChatContent>
              </MyChat>
            ) : (
              <OtherChat key={content + idx}>
                <OtherContent>{content}</OtherContent>
              </OtherChat>
            )
          )}
      </ChatBody>
      <Footer>
        <Input placeholder={'메세지를 입력하세요...'} maxLength={500} />
      </Footer>
    </Container>
  );
}

export default ChatRoom;
