import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Profile from 'components/Profile';

afterEach(cleanup);

test('<Profile />', () => {
  const { container, getByAltText, rerender } = render(<Profile />);
  expect(container).toMatchSnapshot();
  rerender(<Profile alt={'feed profile'} size={"40px"}/>);
  expect(getByAltText('feed profile')).toBeInTheDocument();
});
