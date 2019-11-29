import React from 'react';
import Image from './Image';

interface IImage {
  url: string;
}
interface Iprops {
  images: [IImage];
}

const ImageContainer = ({ images }: Iprops) => {
  return (
    <>
      {images.map(image => (
        <Image url={image.url} key={image.url} />
      ))}
    </>
  );
};

export default ImageContainer;
