import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import WritingFeed from 'composition/Feed/WritingFeed';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';

afterEach(cleanup);

test('<WritingFeed />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <WritingFeed />
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});


