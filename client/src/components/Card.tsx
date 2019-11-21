import React from "react";
import styled from "styled-components";
import ProfileImgDiv from "./ProfileImgDiv";

const FeedDiv = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  margin-bottom: 10px;
  width: 32rem;
  contain: content;
  padding: 30px;
  margin: auto;
`;

const FeedContentDiv = styled.div`
  padding: 12px 12px 0;
`;

const FriendActionButton = styled.input`
  float: right;
  background-color: #f5f6f7;
  border-color: #ccd0d5;
`;

//

function Card() {
  return (
    <FeedDiv>
      <FeedContentDiv className="mainbox">
        <ProfileImgDiv></ProfileImgDiv>
        <FriendActionButton value="친구추가" type="button"></FriendActionButton>
      </FeedContentDiv>
    </FeedDiv>
  );
}

export default Card;
