import React from 'react';
import styled from 'styled-components';
import ImageContainer from './ImageContainer';

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
`;

interface Image {
  id: { url: string };
}
interface Iprops {
  content: string;
}
const FeedBody = ({ content }: Iprops) => {
  return (
    <FeedContents>
      <FeedText>{content}</FeedText>
    </FeedContents>
  );
  // {images && images.length > 0 && <ImageContainer images={images} />}
};

export default FeedBody;
