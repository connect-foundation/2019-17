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
  max-height: 17rem;
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

function ChatRoom({ idx }: { idx: number }) {
  const chatRoomDispatch = useChatRoomDispatch();
  const onClose = () => {
    chatRoomDispatch({ type: 'DELETE_CHATROOM', idx });
  };
  return (
    <Container>
      <ChatHeader nickname={'규종'} onClose={onClose} />
      <ChatBody>
        <MyChat>
          <MyChatContent>안녕하세요?</MyChatContent>
        </MyChat>
        <OtherChat>
          <OtherContent>
            네??
            왜요~~?어라ㅣ어라ㅣ어린ㅇ;ㅁ링렁니렁니렁나러이러이ㅏ러이ㅓㄹ얼이ㅏ
          </OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <OtherChat>
          <OtherContent>네?? 왜요~~?</OtherContent>
        </OtherChat>
        <MyChat>
          <MyChatContent>저기요?</MyChatContent>
        </MyChat>
      </ChatBody>
      <Footer>
        <Input placeholder={'메세지를 입력하세요...'} maxLength={500} />
      </Footer>
    </Container>
  );
}

export default ChatRoom;
