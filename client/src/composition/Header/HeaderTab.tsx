import React from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendsTab from './FriendTab';
import AlarmTab from './AlarmTab';
import NewFriendAlarmNum from './NewFriendAlarmNum';
import {
  useHeaderTabState,
  useHeaderTabDispatch
} from 'stores/HeaderTabContext';
import { HEADER_TAB } from '../../constants';
import { useNewAlarmState, useNewAlarmDispatch } from 'stores/NewAlarmContext';

const RelativeDiv = styled.div`
  position: relative;
`;

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

function HeaderTab() {
  const headerTabState = useHeaderTabState();
  const headerTabDispatch = useHeaderTabDispatch();
  const newAlarmState = useNewAlarmState();
  const newAlarmDispatch = useNewAlarmDispatch();

  return (
    <Container>
      <RelativeDiv>
        <FriendsIcon
          selected={newAlarmState.friends || headerTabState.friends}
          onClick={() => {
            headerTabDispatch({
              type: 'CLICK_FRIENDS',
              key: HEADER_TAB.FRIENDS
            });
            newAlarmDispatch({
              type: 'NEW_FRIENDS',
              key: HEADER_TAB.FRIENDS
            });
          }}
        />
        <NewFriendAlarmNum />
      </RelativeDiv>
      <Tab left={'-230px'} selected={headerTabState.friends}>
        <FriendsTab />
      </Tab>
      <MessageIcon
        selected={headerTabState.message}
        onClick={() =>
          headerTabDispatch({ type: 'CLICK_MESSAGE', key: HEADER_TAB.MESSAGE })
        }
      />
      <Tab selected={headerTabState.message}>
        <MessageTab />
      </Tab>
      <AlarmIcon
        selected={headerTabState.alarm}
        onClick={() =>
          headerTabDispatch({ type: 'CLICK_ALARM', key: HEADER_TAB.ALARM })
        }
      />
      <Tab left={'-160px'} selected={headerTabState.alarm}>
        <AlarmTab selected={headerTabState.alarm} />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
