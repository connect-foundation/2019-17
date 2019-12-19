import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import React, { ReactNode } from 'react';
import theme from 'style/theme';

interface IProps {
  children?: ReactNode;
  mocks: any;
  resolvers: any;
}

function MockForm({ mocks, children, resolvers }: IProps) {
  return (
    <MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </MockedProvider>
  );
}

MockForm.defaultProps = {
  resolvers: {}
};

export default MockForm;
