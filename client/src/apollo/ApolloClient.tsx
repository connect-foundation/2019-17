import React, { useState, useEffect } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hooks';
import link from './Link';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

interface IProps {
  children: React.ReactNode;
}

const Apollo: React.FC = ({ children }: IProps) => {
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
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
