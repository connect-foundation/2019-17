import gql from 'graphql-tag';

export const LOGIN = gql`
  query IsUserLoggedIn {
    login @client
  }
`;

export const GET_IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const LOGOUT = gql`
  query logout {
    logout @client
  }
`;
