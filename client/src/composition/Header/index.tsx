import React from 'react';
import styled from 'styled-components';
import SearchBox from 'composition/Search/SearchBox';
import HelmetTitle from 'components/Helmet';

const HeaderWrapper = styled.div`
  height: 40px;
`;

const Backgound = styled.div`
  background-color: #4267b2;
  width: 100%;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  position: fixed;
  top: 0;
  right: 0;
`;

const ItemContainer = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <>
      <HelmetTitle message={"main"} />
      <HeaderWrapper>
        <Backgound>
          <ItemContainer>
            <SearchBox />
          </ItemContainer>
        </Backgound>
      </HeaderWrapper>
    </>
  );
}

export default Header;
