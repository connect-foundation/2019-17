import React from 'react';
import client from './apollo/ApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

const App: React.FC = () => {
  return <ApolloProvider client={client}>hello boostbook!</ApolloProvider>;
};

export default App;
