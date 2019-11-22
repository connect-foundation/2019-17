import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import Pages from '../SignIn';
import Login from '../SignUp';
import { resolvers, typeDefs } from './../../resolvers';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: document.cookie.indexOf('token') !== -1 ? true : false
  }
});

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
const Main: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  );
};

export default Main;
