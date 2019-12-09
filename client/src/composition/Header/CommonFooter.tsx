import React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.footer`
  width: 100%;
  height: 2rem;
  border-top: solid 1px #dddfe2;
  background-color: white;
`;

interface IProps {
  children?: ReactNode;
  className?: string;
}

function CommonFooter({ children, className }: IProps) {
  return <Container className={className}>{children}</Container>;
}

export default CommonFooter;
