import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import UploadPlusButton from 'composition/Feed/WritingFeed/UploadPlusButton';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';

afterEach(cleanup);

test('<UploadPlusButton />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <UploadPlusButton targetId="1" />
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});
