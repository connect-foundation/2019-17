import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import Profile from 'components/Profile';
import CommonBox from '../CommonBox';
import { useHeaderTabDispatch } from 'stores/HeaderTabContext';
import { CHAT_ROOM } from 'Constants';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';

const Container = styled(CommonBox)<{ isRead: boolean; onClick: () => void }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${props => (props.isRead ? 'white' : '#edf2fa')};
  border-left: 1px solid
    ${props => (props.isRead ? 'inherit' : 'rgba(0,0,0,0.7)')};
`;

const Column = styled.div`
  display: flex;
  min-width: 10%;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  &:last-child {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;

const TextContainer = styled.div`
  margin-left: 1rem;
`;

const Nickname = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
  font-size: 0.875rem;
`;

const MessageText = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textColor};
`;

const DateText = styled.span`
  margin-bottom: 0.25rem;
`;

const Dot = styled.span<{ isRead: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: ${props => (props.isRead ? '2px' : '4px')} solid rgba(0, 0, 0, 0.3);
`;

const CheckIcon = styled(FaCheck)`
  margin-right: 0.5rem;
  color: rgba(0, 0, 0, 0.4);
`;

interface IProps {
  isRead: boolean;
  nickname: string;
  content: string;
  month: number;
  day: number;
  otherUserEmail: string;
  userEmail: string;
  chatRoomId: number;
  lastChatUserEmail: string;
  thumbnail?: string;
}

function MessageBox({
  nickname,
  chatRoomId,
  otherUserEmail,
  lastChatUserEmail,
  content,
  month,
  day,
  thumbnail,
  userEmail,
  isRead
}: IProps) {
  const headerTabDispatch = useHeaderTabDispatch();
  const chatRoomDispatch = useChatRoomDispatch();

  const onClick = () => {
    headerTabDispatch({ type: 'INITSTATE' });
    chatRoomDispatch({
      type: 'CREATE_CHATROOM',
      chatRoom: {
        chatType: CHAT_ROOM.CHAT,
        otherUserEmail,
        nickname,
        thumbnail,
        chatRoomId
      }
    });
  };
  return (
    <Container
      isRead={userEmail === lastChatUserEmail || isRead}
      onClick={onClick}>
      <Column>
        <Profile size={'45px'} imageUrl={thumbnail} />
        <TextContainer>
          <Nickname>{nickname}</Nickname>
          <MessageText>
            {userEmail === lastChatUserEmail ? <CheckIcon /> : <></>}
            {content}
          </MessageText>
        </TextContainer>
      </Column>
      <Column>
        <DateText>{`${month}월 ${day}일`}</DateText>
        <Dot isRead={isRead} />
      </Column>
    </Container>
  );
}

MessageBox.defaultProps = {
  isRead: false
};

export default MessageBox;
