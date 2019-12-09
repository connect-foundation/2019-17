import React from 'react';
import styled from 'styled-components';

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
  return (
    <NewAlarmNumContainer>
      <NewAlarmNumIcon>1</NewAlarmNumIcon>
    </NewAlarmNumContainer>
  );
}

export default NewFriendAlarmNum;
