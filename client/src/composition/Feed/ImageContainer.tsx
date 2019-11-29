import React from 'react';
import Image from './Image';

interface IImage {
  id: { url: string };
}
interface Iprops {
  images: [IImage];
}

const ImageContainer = ({ images }: Iprops) => {
  return (
    <>
      {console.log('aaa', images)}
      {images.map(image => (
        <Image url={image.id.url} key={image.id.url} />
      ))}
    </>
  );
};

export default ImageContainer;
