import React from 'react';
import FeedPresentor from './FeedPresentor';
import WritingFeed from '../../composition/feed/WritingFeed';

const FeedContainer: React.FC = () => {
  return (
    <>
      <WritingFeed />
      <FeedPresentor />
    </>
  );
};

export default FeedContainer;
