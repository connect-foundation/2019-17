import React from 'react';
import styled from 'styled-components';
import FeedList from './index';

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
