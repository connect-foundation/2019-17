import React from 'react';
import ChatRooms from 'composition/ChatRooms';
import FeedContainer from 'composition/Feed/FeedContainer';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin-top: 10px;
`;

const Main: React.FC = () => {
  return (
    <>
      <MainContainer>
        <FeedContainer />
      </MainContainer>
      <ChatRooms />
    </>
  );
};

export default Main;
