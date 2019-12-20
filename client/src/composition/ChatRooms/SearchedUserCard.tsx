import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';

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
  thumbnail?: string;
  nickname: string;
  onClick: () => void;
}

function SearchedUserCard({ onClick, thumbnail, nickname }: IProps) {
  return (
    <UserContainer onClick={onClick}>
      <Profile imageUrl={thumbnail || undefined} size={'25px'} />
      <Nickname>{nickname}</Nickname>
    </UserContainer>
  );
}

export default SearchedUserCard;
