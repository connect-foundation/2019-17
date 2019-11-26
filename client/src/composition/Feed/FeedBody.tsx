import React from 'react';
import styled from 'styled-components';

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
`;

interface Iprops {
  content: string;
}
const FeedBody = ({ content }: Iprops) => {
  return (
    <FeedContents>
      <FeedText>{content}</FeedText>
    </FeedContents>
  );
};

export default FeedBody;
