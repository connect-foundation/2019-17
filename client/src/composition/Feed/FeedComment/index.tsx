import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';
import CommentPresentor from './CommentPresentor';
import { Comment, Maybe } from 'react-components.d';

// comment
const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 12px;
`;

// 역할 :
const CommentContainer = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <CommentDiv>
        <div>
          <CommentPresentor content={comment.content} />
          <div>
            <Profile
              imageUrl={process.env.PUBLIC_URL + '/images/profile.jpg'}
              alt={'profile image'}
              size="32px"
            />
            <input type="text"></input>
            <input type="button" value="입력"></input>
          </div>
        </div>
      </CommentDiv>
    </>
  );
};

export default CommentContainer;
