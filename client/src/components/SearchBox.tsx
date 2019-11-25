import React from 'react';
import SearchButtonIcon from './Icon/SearchButtonIcon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchBoxInput = styled.input`
  height: 23px;
  width: 100%;
  padding-left: 5px;
  float: left;
  max-width: 448px;
  min-width: 144px;
  border: none;
  border-radius: 2px 0 0 2px;
`;

const SearchButton = styled.a`
  background-color: #f5f6f7;
  cursor: pointer;
  border-radius: 0 2px 2px 0;
  bottom: 0;
  border: 0;
  padding: 3px 16px;
  float: left;
`;

function SearchBox() {
  return (
    <>
      <SearchBoxInput type="text" placeholder="검색" />
      <Link to="/search">
      <SearchButton>
        <SearchButtonIcon></SearchButtonIcon>
      </SearchButton>
      </Link>
    </>
  );
}

export default SearchBox;
