import React from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendsTab from './FriendsTab';
import AlarmTab from './AlarmTab';
import { useState } from 'react';

const Container = styled.div`
  position: relative;
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
`;

const cursor = css`
  cursor: pointer;
`;

const active = css`
  color: white;
`;

const nonActive = css`
  color: #203257;
`;

const FriendsIcon = styled(FaUserFriends)<{ active: boolean }>`
  ${cursor}
  ${props => (props.active ? active : nonActive)}
`;

const MessageIcon = styled(AiFillMessage)<{ active: boolean }>`
  ${cursor}
  ${props => (props.active ? active : nonActive)}
`;

const AlarmIcon = styled(FaBell)<{ active: boolean }>`
  ${cursor}
  ${props => (props.active ? active : nonActive)}
`;

interface IInitState {
  [key: string]: boolean;
}

const initState = {
  friends: false,
  message: false,
  alarm: false
};

function HeaderTab() {
  const [tabState, setTabState] = useState<IInitState>(initState);
  const clickIcon = (key: string): void => {
    if (tabState[key]) {
      setTabState(_ => ({ ...initState }));
    } else {
      setTabState(_ => ({ ...initState, [key]: true }));
    }
  };
  return (
    <Container>
      <FriendsIcon
        active={tabState.friends}
        onClick={clickIcon.bind(null, 'friends')}
      />
      <Tab active={tabState.friends}>
        <FriendsTab />
      </Tab>
      <MessageIcon
        active={tabState.message}
        onClick={clickIcon.bind(null, 'message')}
      />
      <Tab active={tabState.message}>
        <MessageTab />
      </Tab>
      <AlarmIcon
        active={tabState.alarm}
        onClick={clickIcon.bind(null, 'alarm')}
      />
      <Tab active={tabState.alarm}>
        <AlarmTab />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
