import React from 'react';
import { Image } from 'react-components.d';
import { Carousel } from 'react-responsive-carousel';
import 'style/carousel.css';

interface IProps {
  images: (Image | null)[];
  width: string;
  height: string;
}

function ImageContainer({ images, width, height }: IProps) {
  if (!images) return <></>;

  return (
    <>
      <Carousel
        autoPlay
        dynamicHeight={true}
        showThumbs={false}
        showStatus={false}>
        {images.map((image, idx) =>
          image && image.url ? (
            <div key={idx + image.url}>
              <img style={{ width, height }} src={image.url} alt={image.url} />
            </div>
          ) : (
            <></>
          )
        )}
      </Carousel>
    </>
  );
}

ImageContainer.defaultProps = {
  width: '400px',
  height: '400px'
};
export default ImageContainer;
