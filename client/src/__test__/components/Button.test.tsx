import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Button from 'components/Button';

afterEach(cleanup);

test('<Button />', () => {
  const { container, getByText, rerender } = render(<Button text={'게시'} />);
  expect(container).toMatchSnapshot();
  expect(getByText('게시')).toBeInTheDocument();

  rerender(<Button text={'수정'} size={'big'} backgroundColor={'red'} />);
  expect(getByText('수정')).toBeInTheDocument();
});
