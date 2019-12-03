import React from 'react';
import ImagePreview from './Image';
import { Image } from 'react-components.d';

interface Iprops {
  images: (Image | null)[];
}

const ImageContainer = ({ images }: Iprops) => {
  if (!images) return <>______</>;
  return (
    <>
      {images.map(image =>
        image && image.url ? (
          <ImagePreview url={image.url} key={image.url} />
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default ImageContainer;
