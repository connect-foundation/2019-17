import React from 'react';
import styled from 'styled-components';
import { DEFAULT } from '../../../Constants';
import ChatHeader from '../ChatHeader';
import Loader from 'components/Loader';
import ChatFooter from '../ChatFooter';
import { Chat } from 'react-components.d';

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
  overflow: auto;
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

const LoadContainer = styled.div`
  width: 100%;
  height: 5px;
`;

interface IProps {
  nickname: string;
  thumbnail: string;
  loading: boolean;
  chatBody: React.MutableRefObject<null>;
  getChatsByChatRoomId: any;
  chatRoomId: number;
  me: any;
  setRef: any;
  onClose: () => void;
}

function ChatRoomPresenter({
  thumbnail,
  nickname,
  onClose,
  loading,
  chatBody,
  getChatsByChatRoomId,
  chatRoomId,
  me,
  setRef
}: IProps) {
  return (
    <Container>
      <ChatHeader
        nickname={nickname}
        onClose={onClose}
        thumbnail={thumbnail || DEFAULT.PROFILE}
      />
      <ChatBody ref={chatBody}>
        {loading ? (
          <Loader size={'20px'} />
        ) : (
          <>
            {getChatsByChatRoomId &&
              getChatsByChatRoomId.map(
                ({ email, content }: Chat, idx: number) =>
                  me && email === me.email ? (
                    <MyChat key={new Date().toISOString() + idx}>
                      <MyChatContent>{content}</MyChatContent>
                    </MyChat>
                  ) : (
                    <OtherChat key={new Date().toISOString() + idx}>
                      <OtherContent>{content}</OtherContent>
                    </OtherChat>
                  )
              )}
            <LoadContainer ref={setRef as any} />
          </>
        )}
      </ChatBody>
      <ChatFooter chatRoomId={chatRoomId} chatBody={chatBody} />
    </Container>
  );
}

export default ChatRoomPresenter;
