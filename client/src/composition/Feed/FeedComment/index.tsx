import React from 'react';
import styled from 'styled-components';

import CommentPresentor from './CommentPresentor';
import { Comment } from 'react-components.d';

// comment
const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 12px;
`;

// 역할 :
const CommentContainer = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <div>
        <CommentPresentor content={comment.content} />
      </div>
    </>
  );
};

export default CommentContainer;
