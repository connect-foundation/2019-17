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
  flex: 1;
`;

const CommentNickname = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.fontMainBlue};
  padding: 0 0.25rem;
  cursor: pointer;
`;

const CommentBubble = styled.div`
  background-color: #f2f3f5;
  display: inline-block;
  border-radius: 18px;
  box-sizing: border-box;
  color: #1c1e21;
  line-height: 16px;
`;

const CommentText = styled.div`
  padding: 8px 10px;
`;

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
