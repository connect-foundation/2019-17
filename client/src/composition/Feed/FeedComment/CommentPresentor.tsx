import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';
import { Comment } from 'react-components.d';
import { DEFAULT } from 'Constants';

const CommentLine = styled.div`
  margin: 0.25rem 0;
  display: flex;
`;

const CommentContent = styled.div`
  margin: 0 0.5rem;
  font-size: 0.75rem;

  display: inline-block;
`;
const CommentNickname = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.fontMainBlue};
  padding: 0 0.25rem;
  cursor: pointer;
`;
const CommentBubble = styled.div`
  background-color: #f2f3f5;
  border-radius: 18px;
  box-sizing: border-box;
  color: #1c1e21;
  display: inline-block;
  width: 430px;
  line-height: 16px;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-word;
  position: relative;
  top: 0.05rem;
`;

const CommentText = styled.div`
  padding: 8px 10px;
`;

// 역할 :
const CommentPresentor = ({ comment }: { comment: Comment }) => {
  const thumbnail = (comment && comment.thumbnail) || DEFAULT.PROFILE;
  return (
    <CommentLine>
      <Profile imageUrl={thumbnail} alt={'profile image'} size="32px" />
      <CommentContent>
        <CommentBubble>
          <CommentText>
            <CommentNickname>{comment.nickname}</CommentNickname>
            {comment.content}
          </CommentText>
        </CommentBubble>
      </CommentContent>
    </CommentLine>
  );
};

export default CommentPresentor;
