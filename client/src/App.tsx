import React from 'react';
import client from './apollo/ApolloClient';
import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import styled, { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';

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
