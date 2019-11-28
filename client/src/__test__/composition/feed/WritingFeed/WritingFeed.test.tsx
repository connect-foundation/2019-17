import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import WritingFeed from 'composition/Feed/WritingFeed';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import { ApolloProvider } from '@apollo/react-hoc';
import client from 'apollo/ApolloClient';

afterEach(cleanup);

test('<WritingFeed />', () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <WritingFeed />
      </ThemeProvider>
    </ApolloProvider>
  );
  expect(container).toMatchSnapshot();
});
