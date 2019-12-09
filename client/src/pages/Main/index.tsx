import React from 'react';
import FeedContainer from 'composition/Feed/FeedContainer';
import ChatRooms from 'composition/ChatRooms';

const Main: React.FC = () => {
  return (
    <>
      <FeedContainer />
      <ChatRooms />
    </>
  );
};

export default Main;
