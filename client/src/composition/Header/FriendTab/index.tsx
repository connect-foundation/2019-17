import React from 'react';
import styled from 'styled-components';
import FriendRequestContainer from './FriendRequestContainer';
import FriendRecommendContainer from './FriendRecommendContainer';
import FriendTabPresenter from './FriendTabPresenter';

const Header = styled.div``;

function FriendsTab() {
  return (
    <Header>
      <FriendTabPresenter text="친구 요청" />
      <FriendRequestContainer />
      <FriendTabPresenter text="알 수도 있는 사람" />
      <FriendRecommendContainer />
    </Header>
  );
}

export default FriendsTab;
