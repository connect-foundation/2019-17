import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import React, { ReactNode } from 'react';
import theme from 'style/theme';

interface IProps {
  children?: ReactNode;
  mocks: any;
}

const MockForm = ({ mocks, children }: IProps) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </MockedProvider>
  );
};

export default MockForm;
