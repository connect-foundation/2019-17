import React, { useState } from 'react';
import CommentPresentor from './CommentPresentor';
import { Comment, Maybe } from 'react-components.d';
import WriteCommentPresentor from './WriteCommentPresentor';
import styled from 'styled-components';

const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 12px;
`;

interface Iprops {
  comments: Maybe<Comment>[] | null | undefined;
  feedId: number | null | undefined;
}
// 역할 :
const CommentContainer = ({ comments, feedId }: Iprops) => {
  const [myComments, setMyComments] = useState<Comment[]>();

  return (
    <CommentDiv>
      {comments &&
        comments.length > 0 &&
        comments.map((comment, idx) => {
          return (
            comment && (
              <CommentPresentor comment={comment} key={'comment' + idx} />
            )
          );
        })}
      {myComments &&
        myComments.map((myComment, idx) => (
          <CommentPresentor
            comment={myComment}
            key={'mycomment_' + idx + new Date()}
          />
        ))}
      {
        <WriteCommentPresentor
          feedId={feedId}
          setComment={setMyComments}
          myComments={myComments ? myComments : []}
        />
      }
    </CommentDiv>
  );
};

export default CommentContainer;
