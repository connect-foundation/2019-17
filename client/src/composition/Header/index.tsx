import React from 'react';
import styled from 'styled-components';
import SearchBox from '../Search/SearchBox';

const HeaderWrapper = styled.div`
  height: 43px;
`;

const Backgound = styled.div`
  background-color: #4267b2;
  width: 100%;
  display: flex;
  color: #fff;
  justify-content: space-between;
  height: 43px;
  position: fixed;
  top: 0;
  right: 0;
`;

const ItemContainer = styled.div`
  width: 1012px;
  margin: auto;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Backgound>
        <ItemContainer>
          <SearchBox></SearchBox>
        </ItemContainer>
      </Backgound>
    </HeaderWrapper>
  );
}

export default Header;
