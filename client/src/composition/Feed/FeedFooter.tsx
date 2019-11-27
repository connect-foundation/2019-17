import React from 'react';
import styled from 'styled-components';
import ThumbLikeIcon from '../../components/Icon/ThumbLikeIcon';
import RoundThumbIcon from '../../components/Icon/RoundThumbIcon';
import CommentIcon from '../../components/Icon/CommentIcon';
import ShareIcon from '../../components/Icon/ShareIcon';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const FeedActionDiv = styled.div`
  border-radius: 0 0 3px 3px;
  color: #1c1e21;
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  width: 100%;
  border-bottom: 1px solid #dadde1;
`;

const LikeShowDiv = styled.div`
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
  display: flex;
`;

const ActionStateDiv = styled.div`
  display: flex;
`;

const ActionbtnDiv = styled.div`
  display: flex;
  margin: 0 12px;
  min-height: 32px;
  padding: 4px 0;
`;

const FullBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  order: 1;
`;

const FeedActionBtn = styled.span<IStyleprops>`
  align-items: center;
  display: flex;
  flex: 1 0;
  justify-content: center;
  color: ${props => {
    return props.hasLiked
      ? props.theme.colors.fontMainBlue
      : props.theme.colors.fontButtonGray;
  }};
  font-weight: 600;
  height: 32px;
  line-height: 14px;
  cursor: pointer;
`;
interface IStyleprops {
  hasLiked?: boolean;
}
interface Iprops {
  likeCnt: number;
  setLikeCnt: any;
  hasLiked: boolean;
  setHasLiked: any;
  feedId: number;
}

const SEND_LIKE = gql`
  mutation updateLike($feedId: Int) {
    updateLike(feedId: $feedId)
  }
`;

const FeedFooter = ({
  likeCnt,
  setLikeCnt,
  hasLiked,
  setHasLiked,
  feedId
}: Iprops) => {
  const [updateLike] = useMutation(SEND_LIKE);

  const ToggleLike = () => {
    setLikeCnt((props: number) => {
      setHasLiked((props: boolean) => !props);
      if (!hasLiked) {
        sendLike(1);
        return props + 1;
      } else {
        // cancleLike(-1);
        return props - 1;
      }
    });
  };

  const sendLike = (count: number) => {
    // send count
    updateLike({ variables: { feedId } });
    console.log(count);
  };
  return (
    <>
      <FeedActionDiv>
        <LikeShowDiv>
          <RoundThumbIcon /> <span> {likeCnt}</span>
        </LikeShowDiv>

        <ActionStateDiv>
          <span>댓글 2개 </span> <span> 공유 5회</span>
        </ActionStateDiv>
      </FeedActionDiv>
      <ActionbtnDiv>
        <FullBtnBox>
          <FeedActionBtn hasLiked={hasLiked} onClick={ToggleLike}>
            <ThumbLikeIcon hasLiked={hasLiked} />
            좋아요
          </FeedActionBtn>
          <FeedActionBtn>
            <CommentIcon />
            댓글
          </FeedActionBtn>
          <FeedActionBtn>
            <ShareIcon />
            공유하기
          </FeedActionBtn>
        </FullBtnBox>
      </ActionbtnDiv>
    </>
  );
};

export default FeedFooter;
