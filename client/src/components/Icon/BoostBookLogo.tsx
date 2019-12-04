import React from 'react';
import styled from 'styled-components';

const Image = styled.img<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 3px;
`;

interface IProps {
  size: string;
  className?: string;
}

function BoostBookLogo({ size, className }: IProps) {
  return (
    <Image
      className={className}
      size={size}
      src={process.env.PUBLIC_URL + '/images/boostbook_logo_white.png'}
    />
  );
}

BoostBookLogo.defaultProps = {
  size: '20px'
};

export default BoostBookLogo;
