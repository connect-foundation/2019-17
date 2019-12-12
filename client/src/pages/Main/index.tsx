import React from 'react';
import ChatRooms from 'composition/ChatRooms';
import FeedContainer from 'composition/Feed/FeedContainer';
import FriendList from 'composition/FriendList';

const Main: React.FC = () => {
  return (
    <>
      <FeedContainer />
      <FriendList />
      <ChatRooms />
    </>
  );
};

export default Main;
