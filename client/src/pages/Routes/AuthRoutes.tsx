import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_PATHS } from '../../constants';
import Header from 'composition/Header';
import Main from '../Main';
import MyPage from '../MyPage';
import NoMatch from '../NoMatch';
import Search from '../Search';
import { useQuery } from '@apollo/react-hooks';
import { loggedIn } from 'resolvers';

const Container = styled.div`
  margin: 0 auto;
  width: 900px;
`;

const AuthRoutes: React.FC = () => {
  useQuery(loggedIn);
  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path={PAGE_PATHS.MAIN} component={Main} />
          <Redirect from={PAGE_PATHS.SIGNUP} to={PAGE_PATHS.MAIN} />
          <Redirect from={PAGE_PATHS.SIGNIN} to={PAGE_PATHS.MAIN} />
          <Route path={PAGE_PATHS.MY_PAGE} component={MyPage} />
          <Route path={PAGE_PATHS.SEARCH} component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </>
  );
};

export default AuthRoutes;
