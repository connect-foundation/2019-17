import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendsTab from './FriendsTab';
import AlarmTab from './AlarmTab';
import {
  useHeaderTabState,
  useHeaderTabDispatch
} from 'stores/HeaderTabContext';
import { HEADER_TAB } from '../../constants';
import { useAlarmCountQuery } from 'react-components.d';
import {
  useHeaderTabCountState,
  useHeaderTabCountDispatch
} from 'stores/HeaderTabCountContext';

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

  const headerTabCountState = useHeaderTabCountState();
  const headerTabCountDispatch = useHeaderTabCountDispatch();
  const { data } = useAlarmCountQuery();

  useEffect(() => {
    if (data) {
      headerTabCountDispatch({
        type: 'SET_INIT_ALARM_CNT',
        key: { id: 'alarmCount', value: data.alarmCount }
      });
    }
  }, [data]);
  
  return (
    <Container>
      <FriendsIcon
        selected={headerTabState.isActiveFriendsTab}
        onClick={() =>
          headerTabDispatch({
            type: 'CLICK_FRIENDS_TAB',
            key: HEADER_TAB.IS_ACTIVE_FRIENDS_TAB
          })
        }
      />
      <Tab left={'-230px'} selected={headerTabState.isActiveFriendsTab}>
        <FriendsTab />
      </Tab>
      <MessageIcon
        selected={headerTabState.isActiveMessageTab}
        onClick={() =>
          headerTabDispatch({
            type: 'CLICK_MESSAGE_TAB',
            key: HEADER_TAB.IS_ACTIVE_MESSAGE_TAB
          })
        }
      />
      <Tab selected={headerTabState.isActiveMessageTab}>
        <MessageTab />
      </Tab>
      <AlarmIcon
        selected={headerTabState.isActiveAlarmTab}
        onClick={() =>
          headerTabDispatch({
            type: 'CLICK_ALARM_TAB',
            key: HEADER_TAB.IS_ACTIVE_ALARM_TAB
          })
        }
      />
      <p>{headerTabCountState.alarmCount}</p>
      <Tab left={'-160px'} selected={headerTabState.isActiveAlarmTab}>
        <AlarmTab selected={headerTabState.isActiveAlarmTab} />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
