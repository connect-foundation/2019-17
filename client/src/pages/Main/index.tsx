import React from 'react';
import FeedContainer from 'composition/Feed';
import FriendList from 'composition/FriendList';

const Main: React.FC = () => {
  return (
    <>
      <FeedContainer />
      <FriendList />
    </>
  );
};

export default Main;
