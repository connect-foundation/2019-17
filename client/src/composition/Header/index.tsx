import React from 'react';
import styled from 'styled-components';
import SearchBox from 'composition/Search/SearchBox';
import HelmetTitle from 'components/Helmet';
import AlarmTab from './HeaderTab';

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

const LogoutButton = styled.span`
  color: white;
  font-weight: 600;
  text-transform: capitalize;
  margin-left: 15px;
  cursor: pointer;
`;

const ItemColumn = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  return (
    <>
      <HelmetTitle message={'main'} />
      <HeaderWrapper>
        <Backgound>
          <ItemContainer>
            <ItemColumn>
              <SearchBox />
            </ItemColumn>
            <ItemColumn>
              <AlarmTab />
              <LogoutButton>logout</LogoutButton>
            </ItemColumn>
          </ItemContainer>
        </Backgound>
      </HeaderWrapper>
    </>
  );
}

export default Header;
