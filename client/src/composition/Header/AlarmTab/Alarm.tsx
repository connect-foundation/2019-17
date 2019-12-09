import React from 'react';
import styled, { css } from 'styled-components';
import Profile from 'components/Profile';
import { Alarm } from 'react-components.d';

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
const cursor = css`
  cursor: pointer;
`;
const BoldText = styled.span`
  ${cursor}
  font-weight: 600;
`;

//
function Alam({ alarm }: { alarm: Alarm }) {
  // const alarms

  return (
    <AlarmContainer>
      <AlarmProfile
        size="48px"
        imageUrl={
          alarm.thumbnail || process.env.PUBLIC_URL + '/images/profile.jpg'
        }
      />
      <AlarmText>
        <AlarmContent>
          <BoldText>{alarm.writer}</BoldText> 님이 새로운 게시글을 올렸습니다.
        </AlarmContent>
        <AlarmInfoText>
          <span> 새 게시글 </span> <span> 2019.11.12 </span>
        </AlarmInfoText>
      </AlarmText>
    </AlarmContainer>
  );
}

export default Alam;
