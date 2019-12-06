import React from 'react';
import FeedList from './index';
import styled from 'styled-components';

const CenterContainer = styled.div`
  margin: 0 auto;
`;

const FeedContainer = () => {
  return (
    <CenterContainer>
      <FeedList />
    </CenterContainer>
  );
};

export default FeedContainer;
