import React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.section`
  width: 100%;
  max-height: 450px;
  overflow: auto;
`;

interface IProps {
  children?: ReactNode;
  className?: string;
}

function CommonBody({ children, className }: IProps) {
  return <Container className={className}>{children}</Container>;
}

export default CommonBody;
