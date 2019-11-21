import React from "react";
import styled from "styled-components";
import FeedHeader from "./FeedHeader";
import FeedBody from "./FeedBody";
import FeedFooter from "./FeedFooter";
import Comment from "./Comment";
import buttons from "../../image/buttons.png";

const FeedDiv = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  margin-bottom: 10px;
  width: 32rem;
`;

const FeedContentDiv = styled.div`
  padding: 12px 12px 0;
`;

const FeedEditDiv = styled.span`
  float: right;
  cursor: pointer;
  background-image: url(${buttons});
  background-repeat: no-repeat;
  background-size: 64px 134px;
  background-position: 0 -66px;
  height: 20px;
  width: 20px;
`;

interface Iprops {
  content: string;
}

function Feed({ content }: Iprops) {
  const cc = content;
  return (
    <>
      <FeedDiv>
        <FeedContentDiv className="mainbox">
          <FeedEditDiv></FeedEditDiv>
          <FeedHeader />
          <FeedBody content={content} />
          <FeedFooter />
        </FeedContentDiv>
        <Comment />
      </FeedDiv>
    </>
  );
}

export default Feed;
