import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { FaPlus } from 'react-icons/fa';

const ButtonContainer = styled.label`
  border: 3px dashed ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borders.radius};
  width: 100px;
  height: 100px;
  color: ${props => props.theme.colors.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.3s linear;
  &:hover {
    color: ${props => lighten(0.2, props.theme.colors.textColor)};
  }
  cursor: pointer;
`;

function UploadPlusButton({ targetId }: { targetId: string }) {
  return (
    <ButtonContainer htmlFor={targetId}>
      <FaPlus />
    </ButtonContainer>
  );
}

export default UploadPlusButton;
