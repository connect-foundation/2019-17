import React from 'react';
import styled, { keyframes } from 'styled-components';
import BoostBookLogo from './Icon/BoostBookLogo';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const opacity = keyframes`
  0% {
      opacity: 0;
  }
  50% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
`;

const LoadingIcon = styled(BoostBookLogo)<{ size: string }>`
  font-size: ${props => props.size};
  font-weight: 600;
  animation: ${opacity} 0.3s linear infinite forwards;
`;

function Loader({ size = '50px' }: { size?: string }) {
  return (
    <Container>
      <LoadingIcon size={size} />
    </Container>
  );
}

export default Loader;
