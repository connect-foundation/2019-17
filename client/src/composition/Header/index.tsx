import React from 'react';
import styled from 'styled-components';
import SearchBox from 'composition/Search/SearchBox';
import HelmetTitle from 'components/Helmet';
import AlarmTab from './HeaderTab';
import Profile from 'components/Profile';
import { useMeQuery } from 'react-components.d';
import { useLazyQuery } from '@apollo/react-hooks';
import { LOGOUT } from 'cache/client.gql';

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
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.span`
  color: white;
  text-transform: capitalize;
  margin-left: 15px;
  cursor: pointer;
`;

const ItemColumn = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderProfile = styled(Profile)`
  margin-right: 5px;
`;

const NicknameText = styled.button`
  all: unset;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 10px;
  font-size: 0.875rem;
`;

const Header: React.FC = () => {
  const { data: { me = null } = {} } = useMeQuery();
  const [logoutLazyQuery] = useLazyQuery(LOGOUT);
  const logout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    logoutLazyQuery();
    window.location.href = '/';
  };
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
              <HeaderProfile
                imageUrl={
                  (me && me.thumbnail) ||
                  process.env.PUBLIC_URL + '/images/profile.jpg'
                }
                size={'25px'}
              />
              <NicknameText>{(me && me.nickname) || ''}</NicknameText>
              <AlarmTab />
              <LogoutButton onClick={logout}>logout</LogoutButton>
            </ItemColumn>
          </ItemContainer>
        </Backgound>
      </HeaderWrapper>
    </>
  );
};

export default Header;
