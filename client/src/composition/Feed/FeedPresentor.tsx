import React from 'react';
import styled from 'styled-components';
import ThumbLikeIcon from 'components/Icon/ThumbLikeIcon';
import CommentIcon from 'components/Icon/CommentIcon';
import ShareIcon from 'components/Icon/ShareIcon';
import RoundThumbIcon from 'components/Icon/RoundThumbIcon';

const FeedDiv = styled.div`
  ${props => props.theme.borders.feedBorder};
  background-color: #fff;
  margin-bottom: 10px;
  width: 32rem;
`;

const FeedContentDiv = styled.div`
  padding: 12px 12px 0;
`;

const FeedEditDiv = styled.span`
  float: right;
  cursor: pointer;
  background-image: url(${process.env.PUBLIC_URL + '/images/buttons.png'});
  background-repeat: no-repeat;
  background-size: 64px 134px;
  background-position: 0 -66px;
  height: 20px;
  width: 20px;
`;
//
const ProfileDiv = styled.div`
  display: inline-block;
  padding-bottom: 0.5rem;
`;

const ProfileImgBox = styled.a`
  display: inline-block;
  float: left;
  padding-right: 0.5rem;
  cursor: pointer;
`;

interface ITest {
  size: string;
}

const ProfileImg = styled.img<ITest>`
  border-radius: 50%;
  border: 1px solid black;
  width: ${props => props.size}px;
  width: 2.5rem;
  height: 2.5rem;
`;

const ProfileNameDiv = styled.div`
  margin-bottom: 0.25rem;
  padding-right: 22px;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.fontMainBlue};
`;

const ProfileDateDiv = styled.span`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`;

const FeedContents = styled.div`
  margin-top: 6px;
  padding-bottom: 14px;
`;

const FeedText = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.38;
`;

//
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

const FeedActionBtn = styled.span`
  align-items: center;
  display: flex;
  flex: 1 0;
  justify-content: center;
  color: ${props => props.theme.colors.fontButtonGray};
  font-weight: 600;
  height: 32px;
  line-height: 14px;
  cursor: pointer;
`;

// comment
const CommentDiv = styled.div`
  border-top: 1px solid #dadde1;
  padding: 4px 12px;
`;
const Comment = styled.div``;

const CommentBubble = styled.div`
  background-color: #f2f3f5;
  border-radius: 18px;
  box-sizing: border-box;
  color: #1c1e21;
  display: inline-block;
  line-height: 16px;
  margin: 0;
  max-width: 100%;
  word-wrap: break-word;
  position: relative;
  white-space: normal;
  word-break: break-word;
`;

const CommentText = styled.p`
  padding: 8px 10px;
`;

const FeedPresenter: React.FC = () => {
  return (
    <FeedDiv>
      <FeedContentDiv className="mainbox">
        <FeedEditDiv></FeedEditDiv>
        <div>
          <ProfileImgBox>
            <ProfileImg size="40"></ProfileImg>
          </ProfileImgBox>
          <ProfileDiv>
            <ProfileNameDiv>우연서</ProfileNameDiv>
            <ProfileDateDiv>11월 12일 오후 6:04 </ProfileDateDiv>
          </ProfileDiv>
        </div>
        <FeedContents>
          <FeedText>
            아르바이트 하실 분을 구합니다!! - 알바 내용 홍대입구근방에서 행사
            관련 판촉물을 수령한 이후, 일산쪽 행사장에서 행사 진행 보조 및 사진
            촬영
          </FeedText>
        </FeedContents>
        <div>
          <FeedActionDiv>
            <LikeShowDiv>
              <RoundThumbIcon /> <span> 12</span>
            </LikeShowDiv>

            <ActionStateDiv>
              <span>댓글 2개 </span> <span> 공유 5회</span>
            </ActionStateDiv>
          </FeedActionDiv>
          <ActionbtnDiv>
            <FullBtnBox>
              <FeedActionBtn>
                <ThumbLikeIcon />
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
        </div>
      </FeedContentDiv>

      <CommentDiv>
        <Comment>
          <ProfileImg size="32"></ProfileImg>
          <CommentBubble>
            <CommentText>댓글댓글</CommentText>
          </CommentBubble>
          <div></div>
        </Comment>
      </CommentDiv>
    </FeedDiv>
  );
};

export default FeedPresenter;
