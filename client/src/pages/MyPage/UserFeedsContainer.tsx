import React from 'react';
import UserFeeds from './UserFeeds';
import styled from 'styled-components';

const CenterContainer = styled.div`
  margin: 0 auto;
  float: left;
`;

interface IProps {
  email: string;
}

const UserFeedsContainer = ({ email }: IProps) => {
  return (
    <CenterContainer>
      <UserFeeds email={email} />
    </CenterContainer>
  );
};

export default UserFeedsContainer;
