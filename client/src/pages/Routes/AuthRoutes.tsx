import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_PATHS } from '../../Constants';
import Header from 'composition/Header';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import NoMatch from 'pages/NoMatch';
import Search from 'pages/Search';
import { useQuery } from '@apollo/react-hooks';
import { loggedIn } from 'apollo/resolvers';
import { ChatRoomProvider } from 'stores/ChatRoomContext';
import FriendList from 'composition/FriendList';

const Container = styled.div`
  margin: 0 auto;
  width: 900px;
`;

const AuthRoutes: React.FC = () => {
  useQuery(loggedIn);
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
