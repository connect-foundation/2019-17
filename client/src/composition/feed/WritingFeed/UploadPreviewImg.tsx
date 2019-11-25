import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borders.radius};
`;

const Overlay = styled.div`
  opacity: 0;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  imageUrl: string;
}

function UploadPreviewImg({ imageUrl }: IProps) {
  return (
    <Container>
      <Image src={imageUrl} />
      <Overlay />
    </Container>
  );
}

export default UploadPreviewImg;
