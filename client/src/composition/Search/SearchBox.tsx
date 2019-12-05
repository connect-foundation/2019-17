import React, { useState } from 'react';
import SearchButtonIcon from 'components/Icon/SearchButtonIcon';
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

const SearchButton = styled.button`
  background-color: ${props => (props.color === 'none' ? '#4080FF' : '#f5f6f7')}
  cursor: pointer;
  border-radius: 0 2px 2px 0;
  bottom: 0;
  border: 0;
  padding: 3px 16px;
`;

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [btnColor, setBtnColor] = useState(false);
  const ConditionalLink = ({ children }: any) =>
    keyword ? (
      <Link to={`/search?keyword=${keyword}`}>{children}</Link>
    ) : (
      <>{children}</>
    );

  function checkInput(event: any) {
    if (keyword.length) return true;
    event.preventDefault();
    return false;
  }

  return (
    <form onSubmit={checkInput}>
      <SearchBoxInput
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onFocus={() => setBtnColor(true)}
        onBlur={() => setBtnColor(false)}
      />
      <ConditionalLink>
        <SearchButton type="submit" color={btnColor ? 'none' : 'blue'}>
          <SearchButtonIcon></SearchButtonIcon>
        </SearchButton>
      </ConditionalLink>
    </form>
  );
}

export default SearchBox;
