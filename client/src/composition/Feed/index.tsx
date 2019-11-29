import React, { useState } from 'react';
import Feed from './Feed';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import { Feeds, Idate, IFeedItem } from './feed.type';
import WritingFeed from './WritingFeed';

interface FeedVars {
  first: number;
  currentCursor: string;
}

const GET_FEEDS = gql`
  query getfeeds($first: Int, $currentCursor: String) {
    feedItems(first: $first, cursor: $currentCursor) {
      searchUser {
        nickname
        thumbnail
      }
      feed {
        createdAt {
          year
          month
          day
          hour
          minute
          second
          nanosecond
        }
        content
      }
      feedId
      totallikes
      imglist {
        id {
          url
        }
      }
      hasLiked
      comments {
        id
        content
      }
    }
  }
`;

const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

// 모듈로 빼자 new Date(year, month, day, hours, minutes, seconds, milliseconds)
const getDate = (date: Idate): Date => {
  const dateob = new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour + 9,
    date.minute,
    date.second,
    Number(String(date.nanosecond).substr(0, 3))
  );
  return dateob;
};

const OFFSET = 4;
const FeedList = () => {
  const [feeds, setFeeds] = useState<IFeedItem[]>([]);
  const [cursor, setCursor] = useState<string>('9999-12-31T09:29:26.050Z');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [_, setRef] = useIntersect(checkIsEnd, {});

  // hooks 에서 useQuery 1 부터 시작
  const { fetchMore } = useQuery<Feeds, FeedVars>(GET_FEEDS, {
    variables: { first: OFFSET, currentCursor: cursor }
  });

  async function fetchMoreFeed() {
    setIsLoading(true);
    const { data: value } = await fetchMore({
      variables: {
        first: OFFSET,
        currentCursor: cursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (!fetchMoreResult.feedItems.length) {
          setIsEnd(true);
          return prev;
        }
        const { feedItems } = fetchMoreResult;
        const lastFeedItem = feedItems[feedItems.length - 1];
        setCursor(getDate(lastFeedItem.feed.createdAt).toISOString());

        return Object.assign({}, prev, {
          feeds: [...feedItems]
        });
      }
    });

    setFeeds([...feeds, ...value.feedItems]);
    setIsLoading(false);
  }

  function checkIsEnd() {
    if (!isEnd) {
      fetchMoreFeed();
    }
  }

  return (
    <>
      <WritingFeed />
      {feeds.map(feed => (
        <Feed
          key={getDate(feed.feed.createdAt).toISOString()}
          content={feed.feed.content}
          feedinfo={feed}
          createdAt={getDate(feed.feed.createdAt).toISOString()}
        />
      ))}
      <LoadCheckContainer
        onClick={fetchMoreFeed}
        ref={setRef as any}></LoadCheckContainer>
      <div onClick={fetchMoreFeed}>
        {isLoading ? 'LOADING' : ''}
        {isEnd ? '마지막 글입니다' : ''}
      </div>
    </>
  );
};

export default FeedList;
