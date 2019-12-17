import React from 'react';
import FeedList from './index';
import styled from 'styled-components';

const CenterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  float: left;
`;

const FeedContainer = () => {
  return (
    <CenterContainer>
      <FeedList />
    </CenterContainer>
  );
};

export default FeedContainer;
