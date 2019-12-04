import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ left: string; active: boolean }>`
  position: absolute;
  top: 30px;
  left: ${props => props.left};
  width: ${props => props.theme.alarmWidth};
  max-height: ${props => props.theme.alarmHeight};
  display: ${props => (props.active ? 'block' : 'none')};
  border: 1px solid rgba(100, 100, 100, 0.4);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 2px 2px;
`;

interface IProps {
  children: ReactNode;
  active: boolean;
  left: string;
}

function MessageTab({ children, active, left }: IProps) {
  return (
    <Container left={left} active={active}>
      {children}
    </Container>
  );
}

MessageTab.defaultProps = {
  left: '-200px',
  active: false
};

export default MessageTab;
