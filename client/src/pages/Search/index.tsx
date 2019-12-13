import React from 'react';
import CardContainer from 'composition/Search/CardContainer';
import ChatRooms from 'composition/ChatRooms';

interface IProps {
  location: any;
}

const Search = (props: IProps) => {
  return (
    <>
      <CardContainer location={props.location} />
      <ChatRooms />
    </>
  );
};

export default Search;
