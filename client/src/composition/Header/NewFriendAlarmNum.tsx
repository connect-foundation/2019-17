import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEffect } from 'react';

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
  right: 1px;
  top: 2px;
`;

const NewAlarmNumIcon = styled.span`
  background-color: #fa3e3e;
  border-radius: 2px;
  color: #fff;
  padding: 1px 3px;
`;

interface IProps {
  selected: boolean;
}

function NewFriendAlarmNum({ selected }: IProps) {
  const [newAlarmNum, setNewAlarmNum] = useState(0);
  const { subscribeToMore, loading, data } = useQuery(GET_ALARM_NUM);

  useEffect(() => {
    subscribeToMore({
      document: FRIEND_ALARM_NUM_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const alarmDiff =
          subscriptionData.data.friendAlarmNumChanged.difference;
        setNewAlarmNum(alarmDiff + prev.friendUnreadAlarmNum);

        return Object.assign(
          {},
          {
            friendUnreadAlarmNum: alarmDiff + prev.friendUnreadAlarmNum
          }
        );
      }
    });
  }, [subscribeToMore]);

  useEffect(() => {
    if (data && data.friendUnreadAlarmNum)
      setNewAlarmNum(data.friendUnreadAlarmNum);
  }, [data]);

  return (
    <NewAlarmNumContainer>
      <NewAlarmNumIcon>{!loading && newAlarmNum}</NewAlarmNumIcon>
    </NewAlarmNumContainer>
  );
}

export default NewFriendAlarmNum;
