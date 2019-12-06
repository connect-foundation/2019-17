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
  alt: string;
  className?: string;
}

function Profile({ imageUrl, size, alt, className }: IProps) {
  return <Image className={className} src={imageUrl} size={size} alt={alt} />;
}

Profile.defaultProps = {
  size: '40px',
  alt: 'profile image',
  imageUrl: process.env.PUBLIC_URL + '/images/profile.jpg'
};

export default Profile;
