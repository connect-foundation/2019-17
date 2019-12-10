import React from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendsTab from './FriendTab';
import AlarmTab from './AlarmTab';
import { useState } from 'react';
import NewFriendAlarmNum from './NewFriendAlarmNum';

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

const FriendsIcon = styled(FaUserFriends)<{ selected: boolean }>`
  ${cursor}
  ${props => (props.selected ? active : nonActive)}
`;

const MessageIcon = styled(AiFillMessage)<{ selected: boolean }>`
  ${cursor}
  ${props => (props.selected ? active : nonActive)}
`;

const AlarmIcon = styled(FaBell)<{ selected: boolean }>`
  ${cursor}
  ${props => (props.selected ? active : nonActive)}
`;

interface IInitState {
  [key: string]: boolean;
}

const FRIENDS = 'friends';
const MESSAGE = 'message';
const ALARM = 'alarm';

const initState = {
  [FRIENDS]: false,
  [MESSAGE]: false,
  [ALARM]: false
};

function HeaderTab() {
  const [tabState, setTabState] = useState<IInitState>(initState);
  const clickIcon = (key: string): void => {
    if (tabState[key]) {
      setTabState({ ...initState });
    } else {
      setTabState({ ...initState, [key]: true });
    }
  };
  return (
    <Container>
      <FriendsIcon
        selected={tabState.friends}
        onClick={clickIcon.bind(null, FRIENDS)}
      />
      <NewFriendAlarmNum selected={tabState.friends} />
      <Tab left={'-230px'} selected={tabState.friends}>
        <FriendsTab />
      </Tab>
      <MessageIcon
        selected={tabState.message}
        onClick={clickIcon.bind(null, MESSAGE)}
      />
      <Tab selected={tabState.message}>
        <MessageTab />
      </Tab>
      <AlarmIcon
        selected={tabState.alarm}
        onClick={clickIcon.bind(null, ALARM)}
      />
      <Tab left={'-160px'} selected={tabState.alarm}>
        <AlarmTab />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
