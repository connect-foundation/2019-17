import React from 'react';
import styled from 'styled-components';
import FriendRequestContainer from './FriendRequestContainer';
import FriendRecommendContainer from './FriendRecommendContainer';

const Header = styled.div``;

function FriendsTab() {
  return (
    <Header>
      <FriendRequestContainer />
      <p>--------</p>
      <FriendRecommendContainer />
    </Header>
  );
}

export default FriendsTab;
