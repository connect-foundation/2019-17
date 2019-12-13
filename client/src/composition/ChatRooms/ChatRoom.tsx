import React from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import {
  useGetChatsByChatRoomIdQuery,
  useMeQuery,
  Chat
} from 'react-components.d';
import ChatFooter from './ChatFooter';
import { useEffect } from 'react';
import { GET_CHAT_SUBSCRIPTION } from './ChatRooms.query';
import Loader from 'components/Loader';
import { useRef } from 'react';
import useIntersect from 'hooks/useIntersectObserver';
import { objToDate, dateToISO } from 'utils/dateUtil';
import { DEFAULT } from '../../constants';

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
  idx: number;
  nickname: string;
  thumbnail: string;
  chatRoomId: number;
}

function ChatRoom({ idx, chatRoomId, nickname, thumbnail }: IProps) {
  console.log('thumbnail', thumbnail);
  const chatRoomDispatch = useChatRoomDispatch();
  const chatBody = useRef(null);
  const {
    data: { getChatsByChatRoomId = null } = {},
    loading,
    subscribeToMore,
    fetchMore
  } = useGetChatsByChatRoomIdQuery({
    variables: { chatRoomId, cursor: '9999-12-31T09:29:26.050Z' }
  });

  const fetchMoreChats = async () => {
    const lastChat: Chat | null =
      getChatsByChatRoomId &&
      getChatsByChatRoomId[getChatsByChatRoomId.length - 1];
    const cursor = lastChat
      ? dateToISO(objToDate(lastChat.createAt))
      : '9999-12-31T09:29:26.050Z';

    await fetchMore({
      variables: { chatRoomId, cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const { getChatsByChatRoomId: chats } = fetchMoreResult;
        if (!prev.getChatsByChatRoomId || !chats || chats.length === 0) {
          return prev;
        }
        return Object.assign({}, prev, {
          getChatsByChatRoomId: [...prev.getChatsByChatRoomId, ...chats]
        });
      }
    });
  };
  // @ts-ignore
  const [_, setRef] = useIntersect(fetchMoreChats, () => {}, {});
  const onClose = () => {
    chatRoomDispatch({ type: 'DELETE_CHATROOM', idx });
  };

  useEffect(() => subscribeToGetChat());

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

  return (
    <Container>
      <ChatHeader
        nickname={nickname}
        onClose={onClose}
        thumbnail={thumbnail || DEFAULT.PROFILE}
      />
      <ChatBody ref={chatBody}>
        {loading || meLoading ? (
          <Loader size={'20px'} />
        ) : (
          <>
            {getChatsByChatRoomId &&
              getChatsByChatRoomId.map(({ email, content }: Chat, idx) =>
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
            <LoadContainer ref={setRef as any} />
          </>
        )}
      </ChatBody>
      <ChatFooter chatRoomId={chatRoomId} chatBody={chatBody} />
    </Container>
  );
}

export default ChatRoom;
