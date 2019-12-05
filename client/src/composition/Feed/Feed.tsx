import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedHeader from './FeedHeader';
import FeedBody from './FeedBody';
import FeedFooter from './FeedFooter';
import Comment from './Comment';
import { IFeedItem } from './feed.type';

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
  content: string;
  createdAt: string;
  feedinfo: IFeedItem;
}

function Feed({ content, createdAt, feedinfo }: Iprops) {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    setLikeCnt(feedinfo.totallikes);
    setHasLiked(feedinfo.hasLiked ? true : false);
  }, []);

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
          />
        </FeedContentDiv>
        <Comment />
      </FeedDiv>
    </>
  );
}

export default Feed;
