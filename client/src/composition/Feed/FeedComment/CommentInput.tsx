import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { IUseInput } from 'hooks/useInput';

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

interface IProps {
  commentText: IUseInput;
  submitCommentbyEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CommentInput = React.forwardRef(
  (
    { commentText, submitCommentbyEnter }: IProps,
    ref: React.MutableRefObject<HTMLInputElement>
  ) => (
    <Input
      placeholder="댓글을 입력하세요"
      {...commentText}
      onKeyDown={submitCommentbyEnter}
      required
      ref={ref}
    />
  )
);

export default CommentInput;
