import gql from 'graphql-tag';

export const login = gql`
  query IsUserLoggedIn {
    login @client
  }
`;

export const getIsLoggedIn = gql`
  {
    isLoggedIn @client
  }
`;
