import React, { useState, useRef, useEffect, useCallback } from 'react';
import Feed from './Feed';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useScrollEnd from '../../hooks/useScrollEnd';
import WritingFeedContainer from './WritingFeed';

interface IFeed {
  content: string;
  createdAt: string;
}

interface Feeds {
  feeds: IFeed[];
}

const GET_FEEDS = gql`
  query getfeeds($first: Int, $currentCursor: String) {
    feeds(first: $first, cursor: $currentCursor) {
      content
      createdAt
    }
  }
`;

interface FeedVars {
  first: number;
  currentCursor: string;
}
const OFFSET = 3;
const FeedContainer = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [cursor, setCursor] = useState<string>('9999-12-31T09:29:26.050Z');

  const checkEnd = useScrollEnd();
  // hooks 에서 useQuery 1 부터 시작
  const { loading, data, fetchMore } = useQuery<Feeds, FeedVars>(GET_FEEDS, {
    variables: { first: OFFSET, currentCursor: cursor }
  });

  useEffect(() => {
    checkEndFeed();
  }, [checkEnd]);

  const fetchMoreFeed = async () => {
    const { data: value } = await fetchMore({
      variables: {
        first: OFFSET,
        currentCursor: cursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        const { feeds: feedItems } = fetchMoreResult;
        const lastFeedItem = feedItems[feedItems.length - 1];
        setCursor(lastFeedItem.createdAt);

        return Object.assign({}, prev, {
          feed: [...prev.feeds, ...fetchMoreResult.feeds]
        });
      }
    });
    setFeeds([...feeds, ...value.feeds]);
  };

  const checkEndFeed = (): void => {
    fetchMoreFeed();
  };

  return (
    <>
      <WritingFeedContainer />
      {feeds.map(feed => (
        <Feed content={feed.content} createdAt={feed.createdAt} />
      ))}
      <span onClick={fetchMoreFeed}>click</span>
    </>
  );
};

export default FeedContainer;