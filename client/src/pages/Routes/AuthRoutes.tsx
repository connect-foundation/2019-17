import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { PAGE_PATHS } from 'Constants';
import Header from 'composition/Header';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import NoMatch from 'pages/NoMatch';
import Search from 'pages/Search';
import { ChatRoomProvider } from 'stores/ChatRoomContext';
import FriendList from 'composition/FriendList';
import { usePublishLoginStateQuery } from 'react-components.d';

const Container = styled.div`
  margin: 0 auto;
  width: 900px;
`;

export const PUBLISH_LOGIN_STATE = gql`
  query publishLoginState {
    loginUser
  }
`;

const AuthRoutes: React.FC = () => {
  usePublishLoginStateQuery();
  return (
    <ChatRoomProvider>
      <Header />
      <Container>
        <Switch>
          <Route exact path={PAGE_PATHS.MAIN} component={Main} />
          <Redirect from={PAGE_PATHS.SIGNUP} to={PAGE_PATHS.MAIN} />
          <Redirect from={PAGE_PATHS.SIGNIN} to={PAGE_PATHS.MAIN} />
          <Route path={PAGE_PATHS.MY_PAGE + '/:email'} component={MyPage} />
          <Route path={PAGE_PATHS.SEARCH} component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
      <FriendList />
    </ChatRoomProvider>
  );
};

export default AuthRoutes;
