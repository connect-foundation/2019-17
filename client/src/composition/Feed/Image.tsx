import React from 'react';
import styled from 'styled-components';

interface Image {
  url: string;
}
const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px solid gray;
  border-radius: 2px;
  margin: 0.2rem 0rem;
  margin-right: 0.2rem;
`;
const Image = ({ url }: Image) => {
  return (
    <>
      <span>
        <ImageBox src={url} alt="My Image" />
      </span>
    </>
  );
};

export default Image;
