import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Image } from 'react-components.d';
import ImageContainer from './ImageContainer';

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div<Sprops>`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
  word-break: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-overflow: ellipsis;
  ${props => (props.isfold ? foldOn : 'display: inline-block;')}
  max-height: 302px;
`;
const foldOn = css`
  overflow: hidden;
  -webkit-line-clamp: 16;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const ReadMore = styled.span`
  color: #385898;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface Sprops {
  isfold: boolean;
}

interface Iprops {
  content: string | null | undefined;
  images: (Image | null)[] | null | undefined;
}

const FEED_MAX_HEIGHT = 300;
const FeedBody = ({ content, images }: Iprops) => {
  const [isFold, setIsFold] = useState<boolean>(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const spreadFold = () => {
    setIsFold(false);
  };

  const checkContentSize = () => {
    return (
      contentRef &&
      contentRef.current &&
      contentRef.current.clientHeight < FEED_MAX_HEIGHT
    );
  };

  useEffect(() => {
    if (checkContentSize()) {
      setIsFold(false);
    }
  }, [contentRef]);

  return (
    <FeedContents>
      <FeedText ref={contentRef} isfold={isFold}>
        {content}
      </FeedText>
      {isFold && <ReadMore onClick={spreadFold}>더 보기</ReadMore>}
      {images && images.length > 0 && <ImageContainer images={images} />}
    </FeedContents>
  );
};

export default FeedBody;
