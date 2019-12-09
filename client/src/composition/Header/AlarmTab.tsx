import React from 'react';
import styled from 'styled-components';
import FeedAlarm from './Alarm/feedAlarm';
const Header = styled.div``;

function AlarmTab() {
  return (
    <Header>
      alarm
      <FeedAlarm />
    </Header>
  );
}

export default AlarmTab;
