import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql'
});

export default client;
