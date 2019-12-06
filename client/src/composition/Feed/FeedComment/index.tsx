import React, { useState } from 'react';
import CommentPresentor from './CommentPresentor';
import { Comment, Maybe } from 'react-components.d';
import WriteCommentPresentor from './WriteCommentPresentor';

interface Iprops {
  comments: Maybe<Comment>[] | null | undefined;
  feedId: number | null | undefined;
}
// 역할 :
const CommentContainer = ({ comments, feedId }: Iprops) => {
  const [myComments, setMyComments] = useState<Comment[]>();

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map(comment => {
          return (
            comment && (
              <>
                <CommentPresentor comment={comment} />
              </>
            )
          );
        })
      ) : (
        <></>
      )}
      {myComments &&
        myComments.map((myComment, idx) => (
          <CommentPresentor comment={myComment} />
        ))}
      {
        <WriteCommentPresentor
          feedId={feedId}
          setComment={setMyComments}
          myComments={myComments ? myComments : []}
        />
      }
    </>
  );
};

export default CommentContainer;
