import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendTab from './FriendTab';
import AlarmTab from './AlarmTab';
import NewFriendAlarmNum from './FriendTab/NewFriendAlarmNum';
import {
  useHeaderTabState,
  useHeaderTabDispatch
} from 'stores/HeaderTabContext';
import { HEADER_TAB } from '../../constants';
import {
  useAlarmCountQuery,
  useFriendUnreadAlarmNumQuery
} from 'react-components.d';
import {
  useHeaderTabCountState,
  useHeaderTabCountDispatch
} from 'stores/HeaderTabCountContext';

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

const FriendIcon = styled(FaUserFriends)<{ selected: boolean }>`
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
  const { data: friendCount } = useFriendUnreadAlarmNumQuery();

  useEffect(() => {
    if (data) {
      headerTabCountDispatch({
        type: 'SET_INIT_ALARM_CNT',
        key: { id: 'alarmCount', value: data.alarmCount }
      });
    }
  }, [data]);

  useEffect(() => {
    if (friendCount) {
      headerTabCountDispatch({
        type: 'SET_INIT_FRIEND_CNT',
        key: { id: 'friendCount', value: friendCount.friendUnreadAlarmNum }
      });
    }
  }, [friendCount, data]);

  return (
    <Container>
      <RelativeDiv>
        <FriendIcon
          selected={
            headerTabCountState.friendCount > 0 || headerTabState.friend
          }
          onClick={() => {
            headerTabDispatch({
              type: 'CLICK_FRIEND',
              key: HEADER_TAB.FRIEND
            });
          }}
        />
        <NewFriendAlarmNum />
      </RelativeDiv>
      <Tab left={'-230px'} selected={headerTabState.friend}>
        <FriendTab selected={headerTabState.friend} />
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

      <p>{headerTabCountState.alarmCount}</p>
      <Tab left={'-160px'} selected={headerTabState.alarm}>
        <AlarmTab selected={headerTabState.alarm} />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
