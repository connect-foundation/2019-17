import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  all: unset;
`;

interface IProps {
  size: string;
  text: string;
}

function Button({ size, text }: IProps) {
  return <SButton>{text}</SButton>;
}

Button.defaultProps = {
  size: 'medium'
};

export default Button;
