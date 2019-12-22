import React, { useState } from 'react';
import { Image } from 'react-components.d';
import { Carousel } from 'react-responsive-carousel';
import 'style/carousel.css';
import useIntersect from 'hooks/useIntersectObserver';
import { useCallback } from 'react';
import styled from 'styled-components';

const FaceImageContainer = styled.div`
  width: 480px;
  height: 500px;
  background: ${props => props.theme.colors.borderColor};
  border-radius: 2px;
`;
interface IProps {
  images: (Image | null)[];
  width: string;
  height: string;
}
const EMPTY_URL = 'Empty';
function ImageContainer({ images, width, height }: IProps) {
  const [imageUrl, setImageUrl] = useState<string[]>([]); //fake image
  const setImages = useCallback(() => {
    const imagelist: string[] = images.map(image => {
      return image && image.url ? image.url : EMPTY_URL;
    });
    setImageUrl(imagelist);
  }, [images]);

  const [, setRef] = useIntersect(setImages, () => {}, { threshold: 0.1 });
  if (!images) return <></>;

  return (
    <>
      {imageUrl && imageUrl.length === 0 ? (
        <FaceImageContainer ref={setRef as any}></FaceImageContainer>
      ) : (
        <Carousel
          autoPlay
          dynamicHeight={true}
          showThumbs={false}
          showStatus={false}>
          {images.map((image, idx) =>
            image && image.url ? (
              <div key={idx + image.url}>
                <img
                  style={{ width, height }}
                  src={imageUrl[idx]}
                  data-src={image.url}
                  alt={image.url}
                />
              </div>
            ) : (
              <></>
            )
          )}
        </Carousel>
      )}
    </>
  );
}

ImageContainer.defaultProps = {
  width: '400px',
  height: '400px'
};
export default ImageContainer;
