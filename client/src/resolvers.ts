import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    login: void
    logout: void
  }
`;

export const loggedIn = gql`
  query publishUser {
    loginUser
  }
`;

export const loginSubscription = gql`
  subscription {
    login
  }
`;

export const logoutSubscription = gql`
  subscription {
    logout
  }
`;

export const resolvers = {
  Query: {
    login: (_: any, __: any, { cache }: { cache: any }) => {
      cache.writeData({
        data: {
          isLoggedIn: document.cookie.indexOf('token') !== -1 ? true : false
        }
      });
    },
    logout: (_: any, __: any, { cache }: { cache: any }) => {
      const date = new Date();
      const expires = `token=; expires=${date.toUTCString()};`;
      document.cookie = expires;
      cache.writeData({ isLoggedIn: false });
    }
  },
  Mutation: {}
};
