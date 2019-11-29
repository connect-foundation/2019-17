import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';

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
          <Profile
            imageUrl={process.env.PUBLIC_URL + '/images/profile.jpg'}
            alt={'profile image'}
            size="32px"
          />
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
