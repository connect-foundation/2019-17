import React from 'react';
import { Image } from 'react-components.d';
import ImagePreview from './Image';

interface Iprops {
  images: (Image | null)[];
}

const ImageContainer = ({ images }: Iprops) => {
  if (!images) return <></>;
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
