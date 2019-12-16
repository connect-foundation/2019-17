import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import {
  useWriteCommentMutation,
  Comment,
  useMeQuery
} from 'react-components.d';
import useInput, { IUseInput } from 'hooks/useInput';
import Profile from 'components/Profile';
import Button from 'components/Button';
import { DEFAULT } from 'Constants'

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

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 83%;
  height: 20px;
  border: ${props => props.theme.borders.borderStyle};
  border-radius: ${props => props.theme.borders.radius};
  padding: 0.9rem;
  transition: border-color 0.5s ease-in-out;
  color: ${props => props.theme.colors.facebookTextColor};
  &:focus {
    border-color: ${props => darken(0.4, props.theme.colors.borderColor)};
  }
  & + & {
    margin-top: 1.25rem;
  }
`;

const WriteCommentPresentor = ({
  feedId,
  setComment,
  myComments
}: {
  feedId: number | null | undefined;
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
  myComments: Comment[];
}) => {
  const commentText: IUseInput = useInput('', () => {});

  function validateNull(comment: string) {
    return Boolean(comment);
  }

  const [writeComment] = useWriteCommentMutation();
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

  return (
    <CommentForm>
      <Profile
        imageUrl={(me && me.thumbnail) || DEFAULT.PROFILE}
        alt={'profile image'}
        size="32px"
      />
      <CommentInputForm>
        <Input placeholder="댓글을 입력하세요" {...commentText} required />
        <Button size={'medium'} text={'등록'} onClick={submitComment} />
      </CommentInputForm>
    </CommentForm>
  );
};

export default WriteCommentPresentor;
