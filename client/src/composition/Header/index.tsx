import React from 'react';
import styled from 'styled-components';
import SearchBox from 'composition/Search/SearchBox';
import { loginSubscription, logoutSubscription } from 'resolvers';
import { useSubscription } from '@apollo/react-hooks';

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

const Header: React.FC = () => {
  const { loading: loginLoading, data: loginUser } = useSubscription(
    loginSubscription
  );
  const { loading: logoutLoading, data: logoutUser } = useSubscription(
    logoutSubscription
  );
  console.log(loginLoading, loginUser, logoutLoading, logoutUser);
  return (
    <HeaderWrapper>
      <Backgound>
        <ItemContainer>
          <SearchBox></SearchBox>
        </ItemContainer>
      </Backgound>
    </HeaderWrapper>
  );
};

export default Header;
