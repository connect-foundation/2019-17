import React from 'react';
import styled from 'styled-components';

import { GET_ALARMS } from './alarm.query';
import { useQuery } from '@apollo/react-hooks';
import Profile from 'components/Profile';

const AlarmContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px 0 1px 0 solid #e5e5e5;
  position: relative;
  color: #1d2129;
  padding: 6px 30px 5px 12px;
  background: white;
  font-size: 0.75rem;
  line-height: 1.34;
`;

const AlarmProfile = styled(Profile)`
  margin-right: 12px;
`;

const AlarmText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  word-wrap: break-word;
`;

const AlarmContent = styled.span`
  max-height: 2.67em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlarmInfoText = styled.div`
  padding-top: 3px;
`;
//
function Alam() {
  // const alarms

  const { data } = useQuery(GET_ALARMS);

  if (data) {
    console.log(data);
  }
  return (
    <AlarmContainer>
      <AlarmProfile size="48px" />
      <AlarmText>
        <AlarmContent> yeonseo 님이 새로운 게시글을 올렸습니다.</AlarmContent>
        <AlarmInfoText>
          <span> 좋아요 </span> <span> 2019.11.12 </span>
        </AlarmInfoText>
      </AlarmText>
    </AlarmContainer>
  );
}

export default Alam;
