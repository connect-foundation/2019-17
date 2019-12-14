import React from 'react';
import styled from 'styled-components';
import { IUser } from 'react-components.d';
import Profile from 'components/Profile';

const UserWrapper = styled.div`
  position: absolute;
  width: 400px;
  color: black;
  background-color: white;
  top: 25px;
  left: 33px;
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

interface IProps {
  setKeyword: (keyword: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: any;
}

function AutoCompleteContainer({
  setVisible,
  setKeyword,
  visible,
  data
}: IProps) {
  return (
    <>
      {visible && data && data.searchUser.length ? (
        <UserWrapper>
          {data.searchUser.map(({ email, nickname, thumbnail }: IUser) => (
            <UserContainer
              key={email || ''}
              onClick={() => {
                setKeyword(nickname || '');
                setVisible(false);
              }}>
              <Profile imageUrl={thumbnail || undefined} size={'25px'} />
              <Nickname>{nickname}</Nickname>
            </UserContainer>
          ))}
        </UserWrapper>
      ) : (
        <></>
      )}
    </>
  );
}

export default AutoCompleteContainer;
