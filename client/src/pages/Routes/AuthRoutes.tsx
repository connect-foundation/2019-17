import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';
import Header from '../Header';
import Main from '../Main';
import MyPage from '../MyPage';
import NoMatch from '../NoMatch';

const AuthRoutes: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={PAGE_PATHS.MAIN} component={Main} />
        <Redirect from={PAGE_PATHS.SIGNUP} to={PAGE_PATHS.MAIN} />
        <Redirect from={PAGE_PATHS.SIGNIN} to={PAGE_PATHS.MAIN} />
        <Route path={PAGE_PATHS.MY_PAGE} component={MyPage} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
};

export default AuthRoutes;
