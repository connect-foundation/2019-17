import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FaBell, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import Tab from './Tab';
import MessageTab from './MessageTab';
import FriendTab from './FriendTab';
import AlarmTab from './AlarmTab';
import NewFriendAlarmNum from './FriendTab/NewFriendAlarmNum';
import NewFeedAlarmNum from './AlarmTab/NewFeedAlarmNum';
import {
  useHeaderTabState,
  useHeaderTabDispatch
} from 'stores/HeaderTabContext';
import { HEADER_TAB } from 'Constants';
import {
  useAlarmCountQuery,
  useFriendUnreadAlarmNumQuery
} from 'react-components.d';
import {
  useHeaderTabCountState,
  useHeaderTabCountDispatch
} from 'stores/HeaderTabCountContext';
import { useOutsideReset } from 'hooks/useOutsideReset';

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
  const { data: alarmCount } = useAlarmCountQuery();
  const { data: friendCount } = useFriendUnreadAlarmNumQuery();

  useEffect(() => {
    if (alarmCount) {
      headerTabCountDispatch({
        type: 'SET_INIT_ALARM_CNT',
        key: { id: 'alarmCount', value: alarmCount.alarmCount }
      });
    }
  }, [alarmCount, headerTabCountDispatch]);

  useEffect(() => {
    if (friendCount) {
      headerTabCountDispatch({
        type: 'SET_INIT_FRIEND_CNT',
        key: { id: 'friendCount', value: friendCount.friendUnreadAlarmNum }
      });
    }
  }, [friendCount, headerTabCountDispatch]);

  const wrapperRef = useOutsideReset(() => {
    if (
      headerTabState.isActiveFriendTab ||
      headerTabState.isActiveAlarmTab ||
      headerTabState.isActiveMessageTab
    ) {
      headerTabDispatch({
        type: 'INITSTATE'
      });
    }
  });

  return (
    <Container ref={wrapperRef}>
      <RelativeDiv>
        <FriendIcon
          selected={
            headerTabCountState.friendCount > 0 ||
            headerTabState.isActiveFriendTab
          }
          onClick={() => {
            headerTabDispatch({
              type: 'CLICK_FRIEND_TAB',
              key: HEADER_TAB.IS_ACTIVE_FRIEND_TAB
            });
          }}
        />
        <NewFriendAlarmNum />
      </RelativeDiv>
      <Tab left={'-230px'} selected={headerTabState.isActiveFriendTab}>
        <FriendTab selected={headerTabState.isActiveFriendTab} />
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
        selected={
          headerTabState.isActiveAlarmTab || headerTabCountState.alarmCount > 0
        }
        onClick={() =>
          headerTabDispatch({
            type: 'CLICK_ALARM_TAB',
            key: HEADER_TAB.IS_ACTIVE_ALARM_TAB
          })
        }
      />
      <NewFeedAlarmNum />
      <Tab left={'-160px'} selected={headerTabState.isActiveAlarmTab}>
        <AlarmTab selected={headerTabState.isActiveAlarmTab} />
      </Tab>
    </Container>
  );
}

export default HeaderTab;
