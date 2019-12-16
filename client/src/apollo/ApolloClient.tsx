import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import link from './Link';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { WRITING_FEED_CONTENT } from 'Constants';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    writingFeedContent: localStorage.getItem(WRITING_FEED_CONTENT) || ''
  }
});

export default client;
