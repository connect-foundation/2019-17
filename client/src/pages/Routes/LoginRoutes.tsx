import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AuthRoutes from '../Routes/AuthRoutes';
import NonAuthRoutes from '../Routes/NonAuthRoutes';

const LoginRoutes = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <AuthRoutes /> : <NonAuthRoutes />;
};

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default LoginRoutes;
