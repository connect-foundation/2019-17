import React from "react";
import styled from "styled-components";

interface ITest {
  size: string;
}

const ProfileImg = styled.img<ITest>`
  border-radius: 50%;
  border: 1px solid black;
  width: ${props => props.size}px;
  width: 2.5rem;
  height: 2.5rem;
`;

// comment
const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 12px;
`;

const CommentBubble = styled.div`
  background-color: #f2f3f5;
  border-radius: 18px;
  box-sizing: border-box;
  color: #1c1e21;
  display: inline-block;
  line-height: 16px;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  position: relative;
  white-space: normal;
  word-break: break-word;
`;

const CommentText = styled.p`
  padding: 8px 10px;
`;

// 역할 :
const Comment: React.FC = () => {
  return (
    <>
      <CommentDiv>
        <div>
          <ProfileImg size="32"></ProfileImg>
          <CommentBubble>
            <CommentText>댓글댓글</CommentText>
          </CommentBubble>
          <div></div>
        </div>
      </CommentDiv>
    </>
  );
};

export default Comment;
