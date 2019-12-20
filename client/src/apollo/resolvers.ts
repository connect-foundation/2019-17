import { WRITING_FEED_CONTENT } from 'Constants';

export default {
  Query: {
    login: (_, __, { cache }: { cache }) => {
      cache.writeData({
        data: {
          isLoggedIn: document.cookie.indexOf('token') !== -1
        }
      });
    },
    logout: (_, __, { cache }: { cache }) => {
      const date = new Date();
      const expires = `token=; expires=${date.toUTCString()};`;
      document.cookie = expires;
      cache.writeData({ data: { isLoggedIn: false } });
    }
  },
  Mutation: {
    enrollWritingFeed: (_, { content }: { content: string }) => {
      localStorage.setItem(WRITING_FEED_CONTENT, content);
    }
  }
};
