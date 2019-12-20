import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useChangeAllRequestReadStateMutation } from 'react-components.d';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';
import FriendRequestContainer from './FriendRequestContainer';
import FriendRecommendContainer from './FriendRecommendContainer';
import FriendTabPresenter from './FriendTabPresenter';
import CommonBody from '../CommonBody';

const Header = styled.div``;

interface IProps {
  selected: boolean;
}

function FriendTab({ selected }: IProps) {
  const headerTabCountDispatch = useHeaderTabCountDispatch();
  const [changeReadState] = useChangeAllRequestReadStateMutation();

  useEffect(() => {
    if (selected) {
      changeReadState();
      headerTabCountDispatch({
        type: 'RESET_FRIEND_CNT'
      });
    }
  }, [selected, changeReadState, headerTabCountDispatch]);

  return (
    <Header>
      <CommonBody>
        <FriendTabPresenter text="친구 요청" />
        <FriendRequestContainer />
        <FriendTabPresenter text="알 수도 있는 사람" />
        <FriendRecommendContainer />
      </CommonBody>
    </Header>
  );
}

export default FriendTab;
