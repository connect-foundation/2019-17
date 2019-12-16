import gql from 'graphql-tag';
import { WRITING_FEED_CONTENT } from 'Constants';
export interface IArgs {
  content: string;
}

export const loggedIn = gql`
  query publishUser {
    loginUser
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
      cache.writeData({ data: { isLoggedIn: false } });
    }
  },
  Mutation: {
    enrollWritingFeed: (_: any, { content }: IArgs, __: any) => {
      localStorage.setItem(WRITING_FEED_CONTENT, content);
    }
  }
};
