import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Card from './components/Card';
import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PAGE_PATHS } from './constants';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import NoMatch from './pages/NoMatch';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path={PAGE_PATHS.MAIN} component={Main} />
          <Route path={PAGE_PATHS.SIGNUP} component={SignUp} />
          <Route path={PAGE_PATHS.SIGNIN} component={SignIn} />
          <Route path={PAGE_PATHS.MY_PAGE} component={MyPage} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
