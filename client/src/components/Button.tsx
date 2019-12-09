import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'style/theme';

interface ISize {
  height: string;
  fontSize: string;
  width: string;
}

interface ISizes {
  [key: string]: ISize;
}

const sizes: ISizes = {
  small: {
    height: '1.5rem',
    fontSize: '0.75rem',
    width: '2.5rem'
  },
  medium: {
    height: '1.75rem',
    fontSize: '0.9rem',
    width: '3.5rem'
  },
  big: {
    height: '2.25rem',
    fontSize: '1.25rem',
    width: '5.5rem'
  }
};

const sizeStyles = css`
  ${({ size }: IProps) =>
    css`
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
      width: ${sizes[size].width};
    `}
`;

const SButton = styled.button<IProps>`
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.backgroundColor};
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${sizeStyles};
`;

interface IProps {
  text: string;
  size: string;
  backgroundColor: string;
  textColor: string;
  full: boolean;
  onChange?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  size,
  text,
  full,
  textColor,
  backgroundColor,
  ...rest
}: IProps) {
  return (
    <SButton
      text={text}
      size={size}
      full={full}
      textColor={textColor}
      backgroundColor={backgroundColor}
      {...rest}>
      {text}
    </SButton>
  );
}

Button.defaultProps = {
  size: 'medium',
  backgroundColor: theme.colors.facebookBlue,
  textColor: 'white',
  full: false
};

export default Button;
