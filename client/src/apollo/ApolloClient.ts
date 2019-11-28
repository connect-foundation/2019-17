import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers, typeDefs } from '../resolvers';
import link from './Link';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: link,
  typeDefs,
  resolvers
});

export default client;
