import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedFooter from './FeedFooter';
import CommentContainer from './FeedComment';
import { IFeed } from 'react-components.d';

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
  background-image: url('/images/buttons.png');
  background-repeat: no-repeat;
  background-size: 64px 134px;
  background-position: 0 -66px;
  height: 20px;
  width: 20px;
`;

interface Iprops {
  content: string | null | undefined;
  createdAt: string;
  feedinfo: IFeed;
}

function Feed({ content, createdAt, feedinfo }: Iprops) {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (feedinfo.totallikes) {
      setLikeCnt(feedinfo.totallikes);
      setHasLiked(feedinfo.hasLiked ? true : false);
    }
  }, []);

  if (!feedinfo || !feedinfo.searchUser) return <></>;
  return (
    <>
      <FeedDiv>
        <FeedContentDiv className="mainbox">
          <FeedEditDiv></FeedEditDiv>
          <FeedHeader
            thumbnail={
              feedinfo.searchUser.thumbnail ||
              process.env.PUBLIC_URL + '/images/profile.jpg'
            }
            nickName={feedinfo.searchUser.nickname}
            createdAt={createdAt}
          />
          <FeedBody content={content} images={feedinfo.imglist} />
          <FeedFooter
            likeCnt={likeCnt}
            setLikeCnt={setLikeCnt}
            hasLiked={hasLiked}
            setHasLiked={setHasLiked}
            feedId={feedinfo.feedId}
            commentCount={feedinfo.comments ? feedinfo.comments.length : 0}
          />
        </FeedContentDiv>

        <CommentContainer
          comments={feedinfo.comments}
          feedId={feedinfo.feedId}
        />
      </FeedDiv>
    </>
  );
}

export default Feed;
