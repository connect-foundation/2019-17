import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import WritingFeed from '../../composition/feed/WritingFeed';
import { ThemeProvider } from 'styled-components';
import theme from '../../style/theme';

afterEach(cleanup);

test('<WritingFeed />', () => {
  const { container, getByText, getByPlaceholderText, getByAltText } = render(
    <ThemeProvider theme={theme}>
      <WritingFeed />
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
  expect(getByText('게시물 만들기')).toBeInTheDocument();
  expect(getByText('사진 업로드')).toBeInTheDocument();
  expect(getByPlaceholderText('게시물 작성')).toBeInTheDocument();
  expect(getByAltText('profile image')).toBeInTheDocument();
});
