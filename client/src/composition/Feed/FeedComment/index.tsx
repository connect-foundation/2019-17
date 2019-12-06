import React from 'react';
import CommentPresentor from './CommentPresentor';
import { Comment } from 'react-components.d';

// 역할 :
const CommentContainer = ({ comment }: { comment: Comment }) => {
  return <CommentPresentor comment={comment} />;
};

export default CommentContainer;
