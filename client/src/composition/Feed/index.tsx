import React, { useState } from 'react';
import Feed from './Feed';
import gql from 'graphql-tag';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import WritingFeed from './WritingFeed';
import NewFeedAlarm from './NewFeedAlarm';
import { Idate, useGetfeedsQuery } from 'react-components.d';
const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

const GET_FEEDS = gql`
  query getfeeds($first: Int, $currentCursor: String) {
    feeds(first: $first, cursor: $currentCursor) {
      cursor
      feedItems {
        searchUser {
          nickname
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
        hasLiked
        imglist {
          url
        }
        comments {
          id
          content
        }
      }
    }
  }
`;

const FEEDS_SUBSCRIPTION = gql`
  subscription subscribeFeed {
    feeds {
      cursor
      feedItems {
        searchUser {
          nickname
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
        hasLiked
        comments {
          id
          content
        }
      }
    }
  }
`;

// 모듈로 빼자 new Date(year, month, day, hours, minutes, seconds, milliseconds)
const getDate = (date: Idate): Date => {
  if (
    !date ||
    !date.year ||
    !date.month ||
    !date.day ||
    !date.hour ||
    !date.minute ||
    !date.second
  )
    return new Date();
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
  // const [isEnd, setIsEnd] = useState<boolean>(false);
  const [_, setRef] = useIntersect(fetchMoreFeed, {});

  // hooks 에서 useQuery 1 부터 시작
  const { data, fetchMore, subscribeToMore } = useGetfeedsQuery({
    variables: { first: OFFSET, currentCursor: '9999-12-31T09:29:26.050Z' }
  });

  async function fetchMoreFeed() {
    const { data: value } = await fetchMore({
      variables: {
        first: OFFSET,
        currentCursor: data && data.feeds ? data.feeds.cursor : ''
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.feeds ||
          !fetchMoreResult.feeds.feedItems ||
          !prev.feeds ||
          !prev.feeds.feedItems
        ) {
          return prev;
        }

        if (!fetchMoreResult.feeds.feedItems.length) {
          return prev;
        }
        const {
          feeds: { feedItems, cursor: newCursor }
        } = fetchMoreResult;

        return Object.assign({}, prev, {
          feeds: {
            cursor: newCursor,
            feedItems: [...prev.feeds.feedItems, ...feedItems],
            __typename: 'IFeeds'
          }
        });
      }
    });
  }

  const subscribeToNewComments = () => {
    return subscribeToMore({
      document: FEEDS_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: newFeeds } = subscriptionData;
        console.log('feedItems , ', prev);
        console.log('newFeeds , ', subscriptionData);
        if (
          !newFeeds ||
          !newFeeds.feeds ||
          !newFeeds.feeds.feedItems ||
          !prev.feeds ||
          !prev.feeds.feedItems
        ) {
          return prev;
        }

        if (!newFeeds.feeds.feedItems.length) {
          return prev;
        }

        const {
          feeds: { feedItems }
        } = newFeeds;

        return Object.assign({}, prev, {
          feeds: {
            cursor: prev.feeds.cursor,
            feedItems: [...feedItems, ...prev.feeds.feedItems],
            __typename: 'IFeeds'
          }
        });
      }
    });
  };

  return (
    <>
      <WritingFeed />
      New FEED!: {data ? 'feed?' : 'no data'}
      <NewFeedAlarm data={'aa'} onEffect={subscribeToNewComments} />
      {data && data.feeds && data.feeds.feedItems
        ? data.feeds.feedItems.map(feed =>
            feed && feed.feed && feed.feed.createdAt ? (
              <Feed
                key={getDate(feed.feed.createdAt).toISOString()}
                content={feed.feed.content}
                feedinfo={feed}
                createdAt={getDate(feed.feed.createdAt).toISOString()}
              />
            ) : (
              <></>
            )
          )
        : 'no data'}
      <LoadCheckContainer
        onClick={fetchMoreFeed}
        ref={setRef as any}></LoadCheckContainer>
      <div>is End</div>
    </>
  );
};

export default FeedList;
