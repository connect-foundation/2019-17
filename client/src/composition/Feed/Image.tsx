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
`;
const Image = ({ url }: Image) => {
  return (
    <>
      <span>
        {url}
        <ImageBox src="images/200x200_.png" alt="My Image" />
      </span>
    </>
  );
};

export default Image;
