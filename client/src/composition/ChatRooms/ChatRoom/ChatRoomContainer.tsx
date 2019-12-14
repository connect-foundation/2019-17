import React, { useEffect, useRef } from 'react';
import {
  useGetChatsByChatRoomIdQuery,
  useMeQuery,
  Chat
} from 'react-components.d';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { GET_CHAT_SUBSCRIPTION } from '../ChatRooms.query';
import { getDate } from 'utils/dateUtil';
import ChatRoomPresenter from './ChatRoomPresenter';
import useIntersect from 'hooks/useIntersectObserver';
import { MAX_DATE } from '../../../constants';

interface IProps {
  idx: number;
  nickname: string;
  thumbnail: string;
  chatRoomId: number;
}

const CHAT_UNIT = 20;

function ChatRoomContainer({ idx, chatRoomId, nickname, thumbnail }: IProps) {
  const chatRoomDispatch = useChatRoomDispatch();
  const chatBody = useRef(null);
  const {
    data: { getChatsByChatRoomId = null } = {},
    loading,
    subscribeToMore,
    fetchMore
  } = useGetChatsByChatRoomIdQuery({
    variables: { chatRoomId, cursor: MAX_DATE }
  });

  const fetchMoreChats = async () => {
    const lastChat: Chat | null =
      getChatsByChatRoomId &&
      getChatsByChatRoomId[getChatsByChatRoomId.length - 1];
    const cursor = lastChat
      ? getDate(lastChat.createAt).toISOString()
      : '9999-12-31T09:29:26.050Z';

    await fetchMore({
      variables: { chatRoomId, cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const { getChatsByChatRoomId: chats } = fetchMoreResult;
        if (
          !prev.getChatsByChatRoomId ||
          !chats ||
          chats.length === 0 ||
          cursor === MAX_DATE
        ) {
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

  useEffect(() => subscribeToGetChat(), []);

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
    <ChatRoomPresenter
      chatRoomId={chatRoomId}
      nickname={nickname}
      thumbnail={thumbnail}
      onClose={onClose}
      loading={loading && meLoading}
      chatBody={chatBody}
      me={me}
      getChatsByChatRoomId={getChatsByChatRoomId}
      setRef={setRef}
    />
  );
}

export default ChatRoomContainer;
