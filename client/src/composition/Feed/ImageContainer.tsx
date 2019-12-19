import React from 'react';
import { Image } from 'react-components.d';
import { Carousel } from 'react-responsive-carousel';
import 'style/carousel.css';

interface Iprops {
  images: (Image | null)[];
}

const ImageContainer = ({ images }: Iprops) => {
  if (!images) return <></>;
  console.log('images ', images);
  return (
    <>
      <Carousel autoPlay dynamicHeight={true} showThumbs={false}>
        {images.map(image =>
          image && image.url ? (
            <div>
              <img
                style={{ width: '400px', height: '400px' }}
                src={image.url}
              />
            </div>
          ) : (
            <></>
          )
        )}
      </Carousel>
    </>
  );
};

export default ImageContainer;
