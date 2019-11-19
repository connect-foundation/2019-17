import React from 'react';
import styled from 'styled-components';

const Image = styled.img<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
`;

interface IProps {
  imageUrl: string;
  size: string;
}

function Profile({ imageUrl, size }: IProps) {
  return <Image src={imageUrl} size={size} />;
}

Profile.defaultProps = {
  size: '40px'
};

export default Profile;
