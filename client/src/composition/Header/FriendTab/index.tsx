import React from 'react';
import styled from 'styled-components';
import FriendRequestContainer from './FriendRequestContainer';
import FriendRecommendContainer from './FriendRecommendContainer';
import FriendTabPresenter from './FriendTabPresenter';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';
import {
  useChangeAllRequestReadStateMutation,
  useRecommendAlarmQuery
} from 'react-components.d';
import { useEffect } from 'react';

const Header = styled.div``;

interface IProps {
  selected: boolean;
}

function FriendsTab({ selected }: IProps) {
  const headerTabCountDispatch = useHeaderTabCountDispatch();
  const [changeReadState] = useChangeAllRequestReadStateMutation();

  useEffect(() => {
    if (selected) {
      changeReadState();
      headerTabCountDispatch({
        type: 'RESET_FRIEND_CNT'
      });
    }
  }, [selected]);

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
