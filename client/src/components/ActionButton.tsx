import React from 'react';
import styled from 'styled-components';
import theme from 'style/theme';

const SButton = styled.button<IProps>`
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: ${theme.borders.borderStyle};
  border-radius: 2px;
  font-weight: bold;
  padding: 0 8px;
  cursor: pointer;
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

function ActionButton({
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

ActionButton.defaultProps = {
  size: 'medium',
  textColor: theme.colors.textColor,
  backgroundColor: '#f5f6f7',
  full: false
};

export default ActionButton;
