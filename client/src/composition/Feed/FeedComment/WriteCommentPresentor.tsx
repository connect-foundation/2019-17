import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { useWriteCommentMutation, Comment } from 'react-components.d';
import useInput, { IUseInput } from 'hooks/useInput';
import Profile from 'components/Profile';

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 80%;
  height: 20px;
  border: ${props => props.theme.borders.borderStyle};
  border-radius: ${props => props.theme.borders.radius};
  padding: 1rem;
  transition: border-color 0.5s ease-in-out;
  color: ${props => props.theme.colors.facebookTextColor};
  &:focus {
    border-color: ${props => darken(0.4, props.theme.colors.borderColor)};
  }
  & + & {
    margin-top: 1.25rem;
  }
`;

// 역할 :
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
        nickname: ''
      };
      const mergedComments = [...myComments, newComment];
      setComment(mergedComments);
    }
  }

  return (
    <>
      <Profile
        imageUrl={process.env.PUBLIC_URL + '/images/profile.jpg'}
        alt={'profile image'}
        size="32px"
      />
      <Input placeholder="댓글을 입력하세요" {...commentText} required />
      <input type="button" value="입력" onClick={submitComment}></input>
    </>
  );
};

export default WriteCommentPresentor;
