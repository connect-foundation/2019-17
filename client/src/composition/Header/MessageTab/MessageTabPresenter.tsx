import React from 'react';
import styled from 'styled-components';
import CommonHeader from '../CommonHeader';
import CommonFooter from '../CommonFooter';
import CommonBody from '../CommonBody';
import MessageBox from './MessageBox';
import { ChatRoom } from 'react-components.d';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`;

const Header = styled(CommonHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

const RecentText = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;

const Text = styled.span`
  color: ${props => props.theme.colors.facebookBlue};
  cursor: pointer;
`;

const Footer = styled(CommonFooter)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

const Body = styled(CommonBody)``;

interface IProps {
  onClickNewMessage: (e: React.MouseEvent<HTMLSpanElement>) => void;
  chatRooms: any;
  userEmail: string;
}

function MessageTabPresenter({
  onClickNewMessage,
  chatRooms,
  userEmail
}: IProps) {
  return (
    <Container>
      <Header>
        <RecentText>
          최근 (
          {chatRooms && chatRooms.length
            ? chatRooms.reduce(
                (acc: number, { lastChat }: ChatRoom): number => {
                  return lastChat && lastChat.email !== userEmail
                    ? acc + 1
                    : acc;
                },
                0
              )
            : 0}
          )
        </RecentText>
        <Text onClick={onClickNewMessage}>새 메세지</Text>
      </Header>
      <Body>
        {chatRooms &&
          chatRooms.length > 0 &&
          chatRooms.map(({ otherUser, lastChat }: ChatRoom) => {
            const other = otherUser.filter(
              user => user && user.email !== userEmail
            )[0];
            return (
              other && (
                <MessageBox
                  key={new Date().toISOString() + other.nickname}
                  nickname={other.nickname}
                  otherUserEmail={other.email}
                  lastChatUserEmail={lastChat.email}
                  month={lastChat.createAt.month || new Date().getMonth() + 1}
                  day={lastChat.createAt.day || new Date().getDay()}
                  content={lastChat.content}
                  thumbnail={other.thumbnail || undefined}
                  userEmail={userEmail}
                  chatRoomId={lastChat.chatRoomId}
                />
              )
            );
          })}
      </Body>
      <Footer>
        <Text>모두 읽은 상태로 표시</Text>
      </Footer>
    </Container>
  );
}

export default MessageTabPresenter;
