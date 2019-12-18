import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import CommonFooter from 'composition/Header/CommonFooter';
import useInput from 'hooks/useInput';
import {
  useCreateChatRoomMutation,
  useGetUserQuery,
  CreateChatRoomMutation
} from 'react-components.d';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import { CHAT_ROOM, DEFAULT } from 'Constants';

const ChatFooter = styled(CommonFooter)``;

const ChatForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  font-size: 1rem;
  border: none;
  width: 75%;
  margin-left: 0.25rem;
  &::placeholder {
    font-size: 0.875rem;
  }
`;

interface IProps {
  onClose: () => void;
  userEmail: string;
}

function NewChatFooter({ userEmail, onClose }: IProps) {
  const { value: chat, onChange: onChangeChat, setValue: setChat } = useInput(
    ''
  );
  const [createChatRoomMutation] = useCreateChatRoomMutation();
  const { data: { getUser = null } = {} } = useGetUserQuery({
    variables: { email: userEmail }
  });
  const chatRoomDispatch = useChatRoomDispatch();

  const createChatRoom = ({ nickname, thumbnail, chatRoomId }) => {
    chatRoomDispatch({
      type: 'CREATE_CHATROOM',
      chatRoom: {
        chatType: CHAT_ROOM.CHAT,
        otherUserEmail: userEmail,
        nickname,
        thumbnail: thumbnail || DEFAULT.PROFILE,
        chatRoomId
      }
    });
  };

  const onSubmit = _.debounce(async () => {
    if (!getUser) {
      alert('유저를 선택해주세요');
      return;
    }
    const { data } = await createChatRoomMutation({
      variables: { userEmail, content: chat }
    });
    if (data && data.createChatRoom) {
      const chats: CreateChatRoomMutation['createChatRoom'] =
        data.createChatRoom;
      if (chats.length && chats[0]) {
        const { thumbnail, nickname } = getUser;
        createChatRoom({
          thumbnail,
          nickname,
          chatRoomId: chats[0] && chats[0].chatRoomId
        });
      }
      setChat('');
      onClose();
    }
  }, 300);

  const handleSubmitDebounce = () => {
    onSubmit();
  };
  return (
    <ChatFooter>
      <ChatForm onSubmit={handleSubmitDebounce}>
        <ChatInput
          placeholder="메세지..."
          value={chat}
          onChange={onChangeChat}
        />
      </ChatForm>
    </ChatFooter>
  );
}

export default NewChatFooter;
