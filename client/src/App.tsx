import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import styled, { ThemeProvider } from 'styled-components';

import client from './apollo/ApolloClient';
import theme from './style/theme';
import GlobalStyles from './style/globalStyles';

const Text = styled.span`
  color: ${props => props.theme.facebookBlue};
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Text>hello boostbook!</Text>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
