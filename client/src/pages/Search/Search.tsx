import React from 'react';
import CardContainer from '../../composition/Search/CardContainer';

interface IProps {
  location: any;
}

const Search = (props: IProps) => {
  return (
    <>
      <CardContainer location={props.location} />
    </>
  );
};

export default Search;
