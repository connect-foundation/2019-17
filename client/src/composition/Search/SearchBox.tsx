import React, { useState } from 'react';
import SearchButtonIcon from 'components/Icon/SearchButtonIcon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useRef } from 'react';
import BoostBookLogo from 'components/Icon/BoostBookLogo';

const Container = styled.div`
  display: flex;
  width: 800px;
  align-items: center;
`;

const SearchBoxInput = styled.input`
  height: 23px;
  width: 400px;
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
  background-color: ${props => (props.color === 'none' ? '#4080FF' : '#f5f6f7')}
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
  const [btnColor, setBtnColor] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideReset(wrapperRef);

  const ConditionalLink = ({ children }: any) =>
    keyword ? (
      <Link to={`/search?keyword=${keyword}`}>{children}</Link>
    ) : (
      <>{children}</>
    );

  function useOutsideReset(ref: any) {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setBtnColor(false);
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    });
  }

  function checkInput(event: any) {
    if (keyword.length) {
      setBtnColor(false);
      return true;
    }

    event.preventDefault();
    return false;
  }

  return (
    <Container>
      <Link to="/">
        <Logo size={'23px'} />
      </Link>
      <form onSubmit={checkInput} ref={wrapperRef}>
        <SearchBoxInput
          onSubmit={checkInput}
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onFocus={() => setBtnColor(true)}
        />
        <ConditionalLink>
          <SearchButton
            type="submit"
            color={btnColor ? 'none' : 'blue'}
            onSubmit={checkInput}
            onClick={() => setBtnColor(true)}>
            <SearchButtonIcon></SearchButtonIcon>
          </SearchButton>
        </ConditionalLink>
      </form>
    </Container>
  );
}

export default SearchBox;
