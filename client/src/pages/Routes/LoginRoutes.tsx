import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import AuthRoutes from '../Routes/AuthRoutes';
import NonAuthRoutes from '../Routes/NonAuthRoutes';
import { login, getIsLoggedIn } from '../../cache/client.gql';

const LoginRoutes = () => {
  useQuery(login);
  const { data } = useQuery(getIsLoggedIn, { fetchPolicy: 'network-only' });
  return data && data.isLoggedIn ? <AuthRoutes /> : <NonAuthRoutes />;
};

export default LoginRoutes;
