import React from 'react';
import styled from 'styled-components';
import {
  useWriteCommentMutation,
  Comment,
  useMeQuery
} from 'react-components.d';
import useInput, { IUseInput } from 'hooks/useInput';
import Profile from 'components/Profile';
import Button from 'components/Button';
import CommentInput from './CommentInput';
import { DEFAULT } from 'Constants';
import { GET_FEEDS } from '../feed.query';

const CommentForm = styled.div`
  position: relative;
`;

const CommentInputForm = styled.div`
  display: inline-block;
  padding: 0 0.5rem;
  width: 100%;
  position: absolute;
  & > button {
    margin: 0 0.25rem;
    position: absolute;
    top: 0.1rem;
  }
`;

interface IProps {
  feedId: number | null | undefined;
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
  myComments: Comment[];
  commentInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

const addComment = (alarms: Comment[], data: any) => {
  return alarms.map((alarm: Comment) => {
    /*  if (data && alarm.feedId === data.changeFeedAlarmReadState) {
      alarm.isRead = true;
    } */
    return alarm;
  });
};

const WriteCommentPresentor = ({
  feedId,
  setComment,
  myComments,
  commentInputRef
}: IProps) => {
  const commentText: IUseInput = useInput('', () => {});

  function validateNull(comment: string) {
    return Boolean(comment);
  }

  const [writeComment] = useWriteCommentMutation({
    update(cache, { data }) {
      const { feeds }: any = cache.readQuery({
        query: GET_FEEDS
      });

      // const filteredAlarms = getAppliedReadAlarms(alarms, data);

      /*  cache.writeQuery({
        query: GET_FEEDS,
        data: { alarms: {} }
      }); */
    }
  });
  const { data: { me = null } = {} } = useMeQuery();
  function submitComment() {
    const comment = commentText.value;
    if (validateNull(comment)) {
      writeComment({
        variables: { content: comment, feedId: Number(feedId) }
      });
      commentText.setValue('');
      const newComment: Comment = {
        content: comment,
        createdAt: null,
        nickname: (me && me.nickname) || '',
        thumbnail: (me && me.thumbnail) || DEFAULT.PROFILE
      };

      const mergedComments = [...myComments, newComment];
      setComment(mergedComments);
    }
  }

  function submitCommentbyEnter(e) {
    if (e.keyCode === 13) {
      submitComment();
    }
  }

  return (
    <CommentForm>
      <Profile
        imageUrl={(me && me.thumbnail) || DEFAULT.PROFILE}
        alt={'profile image'}
        size="32px"
      />
      <CommentInputForm>
        <CommentInput
          ref={commentInputRef}
          submitCommentbyEnter={submitCommentbyEnter}
          commentText={commentText}
        />
        <Button size={'medium'} text={'등록'} onClick={submitComment} />
      </CommentInputForm>
    </CommentForm>
  );
};

export default WriteCommentPresentor;
