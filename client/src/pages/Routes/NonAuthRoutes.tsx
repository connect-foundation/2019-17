import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PAGE_PATHS } from '../../constants';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import NoMatch from '../NoMatch';

const NonAuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={PAGE_PATHS.MAIN} component={SignIn} />
      <Route exact path={PAGE_PATHS.SIGNUP} component={SignUp} />
      <Redirect from={PAGE_PATHS.SIGNIN} to={PAGE_PATHS.MAIN} />
      <Redirect from={PAGE_PATHS.MY_PAGE} to={PAGE_PATHS.MAIN} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default NonAuthRoutes;
