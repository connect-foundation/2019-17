import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { resolvers, typeDefs } from '../resolvers';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetchOptions: { credentials: 'include' }
  }),
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: document.cookie.indexOf('token') !== -1 ? true : false
  }
});

export default client;
