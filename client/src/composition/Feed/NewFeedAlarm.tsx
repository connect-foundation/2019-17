import { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onEffect: () => void | (() => void);
  data: string;
}
const NewFeedAlarmContainer = styled.div`
  border: 1px solid #dadde1;
  display: inline-block;
  position: fixed;
  cursor: pointer;
  top: 70px;
  left: 40%;
  transform: translate(-100%, -50%);
  padding: 0.5rem 0.75rem;
  border-radius: 5rem;
  font-size: 14px;
  background: white;
  box-shadow: 0.5px 0.5px 2px 0px #dadde1;
`;

const NewFeedAlarm = ({ onEffect, data, onClick }: Props) => {
  useEffect(() => {
    return onEffect();
  }, [onEffect]);

  if (data) {
    return (
      <NewFeedAlarmContainer onClick={onClick}>{data}</NewFeedAlarmContainer>
    );
  } else {
    return <></>;
  }
};

export default NewFeedAlarm;
