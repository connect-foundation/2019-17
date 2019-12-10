import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useNewAlarmDispatch } from 'stores/NewAlarmContext';
import { HEADER_TAB } from '../../constants';
import { useRef } from 'react';

const GET_ALARM_NUM = gql`
  query friendUnreadAlarmNum {
    friendUnreadAlarmNum
  }
`;

const FRIEND_ALARM_NUM_CHANGED = gql`
  subscription friendAlarmNumChanged {
    friendAlarmNumChanged {
      difference
    }
  }
`;

const NewAlarmNumContainer = styled.span`
  display: flex;
  position: absolute;
  top: -3px;
  right: -8px;
`;

const NewAlarmNumIcon = styled.span`
  background-color: #fa3e3e;
  border-radius: 2px;
  color: #fff;
  padding: 1px 3px;
  font-size: 10px;
`;

function NewFriendAlarmNum() {
  const { subscribeToMore, loading, data } = useQuery(GET_ALARM_NUM);
  const newAlarmDispatch = useNewAlarmDispatch();
  const isCalled = useRef<boolean>(false);

  useEffect(() => {
    subscribeToMore({
      document: FRIEND_ALARM_NUM_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const alarmDiff =
          subscriptionData.data.friendAlarmNumChanged.difference;
        const nowAlarmNum = alarmDiff + prev.friendUnreadAlarmNum;

        if (nowAlarmNum * prev.friendUnreadAlarmNum <= 0) {
          newAlarmDispatch({
            type: 'NEW_FRIENDS',
            key: HEADER_TAB.FRIENDS
          });
        }

        return Object.assign({
          friendUnreadAlarmNum: nowAlarmNum
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!isCalled.current && data && data.friendUnreadAlarmNum) {
      isCalled.current = true;
      newAlarmDispatch({
        type: 'NEW_FRIENDS',
        key: HEADER_TAB.FRIENDS
      });
    }
  }, [data]);

  if (loading || data.friendUnreadAlarmNum <= 0) return <></>;

  return (
    <NewAlarmNumContainer>
      <NewAlarmNumIcon>{data.friendUnreadAlarmNum}</NewAlarmNumIcon>
    </NewAlarmNumContainer>
  );
}

export default NewFriendAlarmNum;
