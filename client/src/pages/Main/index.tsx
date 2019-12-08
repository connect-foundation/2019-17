import React from 'react';
import FeedContainer from 'composition/Feed/FeedContainer';
import styled from 'styled-components';

const ChatRoom = styled.div`
  position: fixed;
`;

const Main: React.FC = () => {
  return (
    <>
      <FeedContainer />
      <ChatRoom />
    </>
  );
};

export default Main;
