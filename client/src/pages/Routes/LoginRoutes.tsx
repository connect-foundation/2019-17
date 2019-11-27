import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AuthRoutes from '../Routes/AuthRoutes';
import NonAuthRoutes from '../Routes/NonAuthRoutes';

const LoginRoutes = () => {
  useQuery(IS_LOGGED_IN);
  const { data } = useQuery(
    gql`
      {
        isLoggedIn @client
      }
    `,
    { fetchPolicy: 'network-only' }
  );
  return data && data.isLoggedIn ? <AuthRoutes /> : <NonAuthRoutes />;
};

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    login @client
  }
`;

export default LoginRoutes;
