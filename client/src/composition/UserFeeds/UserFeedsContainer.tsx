import React from 'react';
import UserFeeds from './UserFeeds';
import styled from 'styled-components';

const CenterContainer = styled.div`
  margin: 0 auto;
  float: left;
`;

const UserFeedsContainer = ({ email }: { email: string }) => {
  return (
    <CenterContainer>
      <UserFeeds email={email} />
    </CenterContainer>
  );
};

export default UserFeedsContainer;
