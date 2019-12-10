import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ALARM_NUM = gql`
  query friendUnreadAlarmNum {
    friendUnreadAlarmNum
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

function NewFriendAlarmNum() {
  const [newAlarmNum, setNewAlarmNum] = useState(0);
  const { loading, error, data } = useQuery(GET_ALARM_NUM);

  return (
    <NewAlarmNumContainer>
      <NewAlarmNumIcon>{!loading && data.friendUnreadAlarmNum}</NewAlarmNumIcon>
    </NewAlarmNumContainer>
  );
}

export default NewFriendAlarmNum;
