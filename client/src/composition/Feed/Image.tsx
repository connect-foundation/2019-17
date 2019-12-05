import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-components.d';

const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px solid gray;
  border-radius: 2px;
  margin: 0.2rem 0rem;
  margin-right: 0.2rem;
`;
const ImagePreview = ({ url }: Image) => {
  if (!url) return <></>;
  return (
    <span>
      <ImageBox src={url} alt="My Image" />
    </span>
  );
};

export default ImagePreview;
