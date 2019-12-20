import React from 'react';
import styled from 'styled-components';
import { useHeaderTabCountState } from 'stores/HeaderTabCountContext';

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

function NewFeedAlarmNum() {
  const headerTabCountState = useHeaderTabCountState();

  if (headerTabCountState.alarmCount <= 0) return <></>;

  return (
    <NewAlarmNumContainer>
      <NewAlarmNumIcon>{headerTabCountState.alarmCount}</NewAlarmNumIcon>
    </NewAlarmNumContainer>
  );
}

export default NewFeedAlarmNum;
