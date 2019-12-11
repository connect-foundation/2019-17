import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { useGetChatsByChatRoomIdQuery, useMeQuery } from 'react-components.d';
import ChatFooter from './ChatFooter';
import { useEffect } from 'react';
import { GET_CHAT_SUBSCRIPTION } from './ChatRooms.query';

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
    loading,
    subscribeToMore
  } = useGetChatsByChatRoomIdQuery({
    variables: { chatRoomId }
  });
  const { data: { me = null } = {}, loading: meLoading } = useMeQuery();
  const subscribeToGetChat = () => {
    return subscribeToMore({
      document: GET_CHAT_SUBSCRIPTION,
      variables: { chatRoomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const {
          data: { getChatsByChatRoomId }
        } = subscriptionData;
        if (!prev.getChatsByChatRoomId || !getChatsByChatRoomId) return prev;
        return Object.assign({}, prev, {
          getChatsByChatRoomId: [
            getChatsByChatRoomId,
            ...prev.getChatsByChatRoomId
          ]
        });
      }
    });
  };

  useEffect(() => subscribeToGetChat());

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
      <ChatFooter chatRoomId={chatRoomId} />
    </Container>
  );
}

export default ChatRoom;
