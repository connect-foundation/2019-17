import React, { useState, MutableRefObject, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchButtonIcon from 'components/Icon/SearchButtonIcon';
import BoostBookLogo from 'components/Icon/BoostBookLogo';
import { useOutsideReset } from 'hooks/useOutsideReset';
import { PAGE_PATHS } from 'Constants';

const Container = styled.div`
  display: flex;
  width: 500px;
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
  background-color: ${props =>
    props.color === 'none' ? '#4080FF' : '#f5f6f7'};
  cursor: pointer;
  border-radius: 0 2px 2px 0;
  bottom: 0;
  border: 0;
  padding: 3px 16px;
`;

const Logo = styled(BoostBookLogo)`
  margin-right: 10px;
`;

const Home = styled.a``;

interface IProps {
  children: ReactNode;
}

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [btnColor, setBtnColor] = useState(false);
  const wrapperRef: MutableRefObject<null> = useOutsideReset(() => {
    setBtnColor(false);
  });

  const ConditionalLink = ({ children }: IProps) =>
    keyword ? (
      <Link to={`/search?keyword=${keyword}`}>{children}</Link>
    ) : (
      <>{children}</>
    );

  function checkInput(event: any) {
    event.preventDefault();

    if (keyword.length) {
      setBtnColor(false);
      return true;
    }

    return false;
  }

  return (
    <Container>
      <Home href={PAGE_PATHS.MAIN}>
        <Logo size={'23px'} />
      </Home>
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
            <SearchButtonIcon
              color={btnColor ? 'white' : 'gray'}></SearchButtonIcon>
          </SearchButton>
        </ConditionalLink>
      </form>
    </Container>
  );
}

export default SearchBox;
