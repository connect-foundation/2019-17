import React from 'react';
import ChatRooms from 'composition/ChatRooms';
import MyPageConatiner from 'composition/MyPage';

const MyPage: React.FC = () => {
  return (
    <>
      <MyPageConatiner />
      <ChatRooms />
    </>
  );
};

export default MyPage;
