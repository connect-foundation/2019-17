import React from 'react';
import AuthRoutes from 'pages/Routes/AuthRoutes';
import NonAuthRoutes from 'pages/Routes/NonAuthRoutes';
import { LOGIN, GET_IS_LOGGED_IN } from 'cache/auth.query';
import { useQuery } from '@apollo/react-hooks';

const LoginRoutes = () => {
  useQuery(LOGIN, {
    pollInterval: 2000
  });
  const { data, loading } = useQuery(GET_IS_LOGGED_IN, {
    fetchPolicy: 'network-only'
  });
  if (loading) return <></>;
  return data && data.isLoggedIn ? <AuthRoutes /> : <NonAuthRoutes />;
};

export default LoginRoutes;
