import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ChatHeader from './ChatHeader';
import { useChatRoomDispatch } from 'stores/ChatRoomContext';
import NewChatFooter from './NewChatFooter';
import { useGetUserNameLazyQuery } from 'react-components.d';
import Profile from 'components/Profile';

const Container = styled.div`
  width: 20rem;
  background-color: white;
  min-height: 23rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewFriends = styled.div`
  height: 2rem;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textColor};
`;

const Input = styled.input`
  font-size: 1rem;
  border: none;
  width: 75%;
  margin-left: 0.25rem;
`;

const HeadContainer = styled.div``;

const UserWrapper = styled.div`
  position: relative;
  top: 0;
  left: 2rem;
  width: 80%;
  max-height: 10rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const UserContainer = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  cursor: pointer;
  &:not(:first-child) {
    margin-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Nickname = styled.span`
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

interface IUserInfo {
  email: string;
  nickname: string;
}

function NewChatRoom({ idx }: { idx: number }) {
  const [nickname, setNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [getUserQuery, { data }] = useGetUserNameLazyQuery({
    variables: { keyword: nickname }
  });
  const chatRoomDispatch = useChatRoomDispatch();
  const onClose = () => {
    chatRoomDispatch({ type: 'DELETE_CHATROOM', idx });
  };

  const getUserDebounce = _.debounce(() => {
    getUserQuery();
  }, 500);

  const handleOnChangeNickname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { value }
    } = e;
    setNickname(value);
    setUserEmail('');
    getUserDebounce();
  };

  const onClickUser = ({ email, nickname }: IUserInfo) => {
    setUserEmail(email);
    setNickname(nickname);
  };
  return (
    <Container>
      <HeadContainer>
        <ChatHeader
          nickname="새 메세지"
          isProfile={false}
          btncolor={'#4267B2'}
          onClose={onClose}
        />
        <NewFriends>
          <Text>받는 사람 : </Text>
          <Input onChange={handleOnChangeNickname} value={nickname} />
        </NewFriends>
        {!userEmail && data && data.searchUser.length > 0 ? (
          <UserWrapper>
            {data.searchUser.map(({ email, nickname, thumbnail }) => (
              <UserContainer
                key={email}
                onClick={onClickUser.bind(null, {
                  email,
                  nickname
                })}>
                <Profile imageUrl={thumbnail || undefined} size={'25px'} />
                <Nickname>{nickname}</Nickname>
              </UserContainer>
            ))}
          </UserWrapper>
        ) : (
          <></>
        )}
      </HeadContainer>
      <NewChatFooter userEmail={userEmail} onClose={onClose} />
    </Container>
  );
}

export default NewChatRoom;
