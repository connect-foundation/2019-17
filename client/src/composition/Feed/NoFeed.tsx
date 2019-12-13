import { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onEffect: () => void | (() => void);
  data: string;
}
const NoFeedGuide = styled.div`
  border: 1px solid #dadde1;
  display: inline-block;
  cursor: pointer;
  width: 510px;
  text-align: center;
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  font-size: 14px;
  background: white;
  box-shadow: 0.5px 0.5px 2p x 0px #dadde1;
`;

const NoFeed = () => {
  return (
    <NoFeedGuide>마지막 피드입니다. 새로운 친구를 만들어보세요~</NoFeedGuide>
  );
};

export default NoFeed;
