import React from 'react';
import AuthRoutes from 'pages/Routes/AuthRoutes';
import NonAuthRoutes from 'pages/Routes/NonAuthRoutes';
import { login, getIsLoggedIn } from 'cache/client.gql';
import { useQuery } from '@apollo/react-hooks';

const LoginRoutes = () => {
  useQuery(login, {
    pollInterval: 2000
  });
  const { data, loading } = useQuery(getIsLoggedIn, {
    fetchPolicy: 'network-only'
  });
  if (loading) return <></>;
  return data && data.isLoggedIn ? <AuthRoutes /> : <NonAuthRoutes />;
};

export default LoginRoutes;
