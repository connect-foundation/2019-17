import React from 'react';
import CardContainer from 'composition/Search/CardContainer';
import ChatRooms from 'composition/ChatRooms';
import Helmet from 'components/Helmet';

interface IProps {
  location: any;
}

const Search = (props: IProps) => {
  return (
    <>
      <Helmet message={'search'} />
      <CardContainer location={props.location} />
      <ChatRooms />
    </>
  );
};

export default Search;
