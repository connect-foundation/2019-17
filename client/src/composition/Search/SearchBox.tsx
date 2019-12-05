import React, { useState } from 'react';
import SearchButtonIcon from 'components/Icon/SearchButtonIcon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BoostBookLogo from 'components/Icon/BoostBookLogo';

const Container = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
`;

const SearchBoxInput = styled.input`
  height: 23px;
  width: 100%;
  padding-left: 5px;
  float: left;
  max-width: 448px;
  min-width: 144px;
  border: none;
  border-radius: 2px 0 0 2px;
  &::placeholder {
    font-size: 0.875rem;
  }
`;

const SearchButton = styled.button`
  background-color: #f5f6f7;
  cursor: pointer;
  border-radius: 0 2px 2px 0;
  bottom: 0;
  border: 0;
  padding: 3px 16px;
`;

const Logo = styled(BoostBookLogo)`
  margin-right: 10px;
`;

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  return (
    <Container>
      <Logo size={'23px'} />
      <SearchBoxInput
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <Link to={`/search?keyword=${keyword}`}>
        <SearchButton>
          <SearchButtonIcon></SearchButtonIcon>
        </SearchButton>
      </Link>
    </Container>
  );
}

export default SearchBox;
