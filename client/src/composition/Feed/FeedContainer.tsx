import React from 'react';
import FeedPresentor from './FeedPresentor';
import WritingFeedContainer from './WritingFeed';

const FeedContainer: React.FC = () => {
  return (
    <>
      <WritingFeedContainer />
      <FeedPresentor />
    </>
  );
};

export default FeedContainer;
