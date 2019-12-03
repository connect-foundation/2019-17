import React from 'react';
import FeedList from './index';
import WritingFeedContainer from './WritingFeed';
import styled from 'styled-components';

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FeedContainer = () => {
  return (
    <CenterContainer>
      {/* <WritingFeedContainer /> */}
      <FeedList />
    </CenterContainer>
  );
};

export default FeedContainer;
