import React, { useState } from 'react';
import Feed from './Feed';
import { useQuery } from '@apollo/react-hooks';
import WritingFeedContainer from './WritingFeed';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import { GetfeedsDocument } from 'react-components.d';

interface IFeed {
  content: string;
  createdAt: string;
}

interface Feeds {
  feeds: IFeed[];
}

interface FeedVars {
  first: number;
  currentCursor: string;
}

const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

const Loading = styled.div``;

const OFFSET = 4;
const FeedContainer = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [cursor, setCursor] = useState<string>('9999-12-31T09:29:26.050Z');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [ref, setRef] = useIntersect(checkIsEnd, {});

  // hooks 에서 useQuery 1 부터 시작
  const { loading, data, fetchMore } = useQuery<Feeds, FeedVars>(GetfeedsDocument, {
    variables: { first: OFFSET, currentCursor: cursor }
  });

  async function fetchMoreFeed() {
    try {
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
          if (!fetchMoreResult.feeds.length) {
            setIsEnd(true);
            return prev;
          }

          const { feeds: feedItems } = fetchMoreResult;
          const lastFeedItem = feedItems[feedItems.length - 1];
          setCursor(lastFeedItem.createdAt);

          return Object.assign({}, prev, {
            feeds: [...feedItems]
          });
        }
      });
      setFeeds([...feeds, ...value.feeds]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function checkIsEnd() {
    if (!isEnd) {
      fetchMoreFeed();
    }
  }

  return (
    <>
      <WritingFeedContainer />
      {feeds.map(feed => (
        <Feed
          key={feed.createdAt}
          content={feed.content}
          createdAt={feed.createdAt}
        />
      ))}
      <LoadCheckContainer
        onClick={fetchMoreFeed}
        ref={setRef as any}></LoadCheckContainer>
      <Loading>
        {isLoading ? 'LOADING' : ''}
        {isEnd ? '마지막 글입니다' : ''}
      </Loading>
    </>
  );
};

export default FeedContainer;
