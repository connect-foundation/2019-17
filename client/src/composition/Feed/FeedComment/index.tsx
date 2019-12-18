import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment, Maybe } from 'react-components.d';
import CommentPresentor from './CommentPresentor';
import WriteCommentPresentor from './WriteCommentPresentor';

const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 0;
`;

interface Iprops {
  comments: Maybe<Comment>[] | null | undefined;
  feedId: number | null | undefined;
  commentInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const CommentContainer = ({ comments, feedId, commentInputRef }: Iprops) => {
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
          commentInputRef={commentInputRef}
        />
      }
    </CommentDiv>
  );
};

export default CommentContainer;
