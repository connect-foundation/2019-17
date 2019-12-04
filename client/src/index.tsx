import React, { useState, useEffect } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import App from './App';
import link from './apollo/Link';
import { resolvers } from './apollo/resolvers';
import { typeDefs } from './apollo/typeDefs';

const Index: React.FC = () => {
  const [client, setClient] = useState<ApolloClient<any>>();
  useEffect(() => {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      cache,
      link,
      typeDefs,
      resolvers
    });

    persistCache({
      cache,
      storage: window.localStorage
    }).then(() => {
      setClient(client);
    });
  }, []);
  if (client === undefined) return <div>Loading...</div>;
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
