import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import link from './Link';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    writingFeedContent: localStorage.getItem('writingFeedContent') || ''
  }
});

export default client;
