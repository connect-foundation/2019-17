import React from "react";
import styled from "styled-components";
import ImageContainer from "./ImageContainer";
import { Image } from "react-components.d";

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
  word-break: break-all;
  white-space: pre;
`;

interface Iprops {
  content: string | null | undefined;
  images: (Image | null)[] | null | undefined;
}
const FeedBody = ({ content, images }: Iprops) => {
  return (
    <FeedContents>
      <FeedText>{content}</FeedText>
      {images && images.length > 0 && <ImageContainer images={images} />}
    </FeedContents>
  );
};

export default FeedBody;
