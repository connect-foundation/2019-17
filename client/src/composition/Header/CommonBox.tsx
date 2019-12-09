import React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

const Container = styled.article`
  background-color: white;
  padding: 0.375rem 0.75rem;
  border-bottom: 1px solid #dddfe2;
  &:last-child {
    border-top: 1px solid #dddfe2;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface IProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function CommonBox({ onClick, children, className }: IProps) {
  return (
    <Container onClick={onClick} className={className}>
      {children}
    </Container>
  );
}

export default CommonBox;
