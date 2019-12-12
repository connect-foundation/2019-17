import React from 'react';
import styled from 'styled-components';
import { useGetUserNameLazyQuery } from 'react-components.d';
import Profile from 'components/Profile';
import { useEffect } from 'react';

const UserWrapper = styled.div`
  position: absolute;
  width: 400px;
  color: black;
  background-color: white;
  top: 32px;
  left: 59px;
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
  keyword: string;
  setKeyword: (keyword: string) => void;
}

function AutoCompleteContainer({ keyword, setKeyword }: IProps) {
  const [getUserQuery, { data }] = useGetUserNameLazyQuery();

  useEffect(() => {
    if (keyword.length) getUserQuery({ variables: { keyword } });
  }, [keyword]);

  return (
    <>
      {keyword && data && data.searchUser.length > 0 ? (
        <UserWrapper>
          {data.searchUser.map(({ email, nickname, thumbnail }) => (
            <UserContainer key={email} onClick={() => setKeyword(nickname)}>
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
