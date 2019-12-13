import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PAGE_PATHS } from 'constant';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import NoMatch from 'pages/NoMatch';

const NonAuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={PAGE_PATHS.MAIN} component={SignIn} />
      <Route exact path={PAGE_PATHS.SIGNUP} component={SignUp} />
      <Redirect from={PAGE_PATHS.SIGNIN} to={PAGE_PATHS.MAIN} />
      <Redirect from={PAGE_PATHS.MY_PAGE} to={PAGE_PATHS.MAIN} />
      <Redirect from={PAGE_PATHS.SEARCH} to={PAGE_PATHS.MAIN} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default NonAuthRoutes;
