import React from 'react';
import styled from 'styled-components';
import UserFeeds from './UserFeeds';

const CenterContainer = styled.div`
  margin: 0 auto;
  float: left;
`;

function UserFeedsContainer({ email }: { email: string }) {
  return (
    <CenterContainer>
      <UserFeeds email={email} />
    </CenterContainer>
  );
}

export default UserFeedsContainer;
