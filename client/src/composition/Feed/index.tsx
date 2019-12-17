import React, { useState } from 'react';
import Feed from './Feed';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import WritingFeed from './WritingFeed';
import NewFeedAlarm from './NewFeedAlarm';
import NoFeed from './NoFeed';
import { useGetfeedsQuery, useMeQuery } from 'react-components.d';
import { getDate } from 'utils/dateUtil';
import { FEEDS_SUBSCRIPTION } from './feed.query';
import Loader from 'components/Loader';

const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

const LoadContainer = styled.div`
  width: 100%;
  height: 10rem;
`;

const OFFSET = 4;
const ALARM_LIMIT = 0;
const FeedList = () => {
  const [, setRef] = useIntersect(fetchMoreFeed, () => {}, {});
  const [, setTopRef] = useIntersect(feedAlarmOff, feedAlarmOn, {});

  const [feedAlarm, setFeedAlarm] = useState(0);
  const [AlarmMessage, setAlarmMessage] = useState('');
  const { data: myInfo } = useMeQuery();
  const { data, fetchMore, subscribeToMore, loading } = useGetfeedsQuery({
    variables: { first: OFFSET, currentCursor: '9999-12-31T09:29:26.050Z' }
  });

  const scrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  async function feedAlarmOn() {
    if (feedAlarm > ALARM_LIMIT) {
      setAlarmMessage('새 피드 ' + feedAlarm + '개');
    } else {
      setAlarmMessage('');
    }
  }
  async function feedAlarmOff() {
    setFeedAlarm(0);
    setAlarmMessage('');
  }

  async function fetchMoreFeed() {
    await fetchMore({
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
          !prev.feeds.feedItems ||
          !fetchMoreResult.feeds.feedItems.length
        ) {
          return prev;
        }

        const {
          feeds: { feedItems, cursor: newCursor }
        } = fetchMoreResult;
        let finalCursor = newCursor;

        if (newCursor === prev.feeds.cursor) {
          finalCursor = '';
        }
        return Object.assign({}, prev, {
          feeds: {
            cursor: finalCursor,
            feedItems: [...prev.feeds.feedItems, ...feedItems],
            __typename: 'IFeeds'
          }
        });
      }
    });
  }

  const subscribeToNewFeeds = () => {
    return subscribeToMore({
      document: FEEDS_SUBSCRIPTION,
      variables: {
        userEmail: myInfo && myInfo.me && myInfo.me.email ? myInfo.me.email : ''
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: newFeeds } = subscriptionData;

        if (
          !newFeeds ||
          !newFeeds.feeds ||
          !newFeeds.feeds.feedItems ||
          !prev.feeds ||
          !prev.feeds.feedItems ||
          !newFeeds.feeds.feedItems.length
        ) {
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

  if (!data || !data.feeds || !data.feeds.feedItems) return <></>;

  return loading ? (
    <LoadContainer>
      <Loader />
    </LoadContainer>
  ) : (
    <>
      <div ref={setTopRef as any}>
        <WritingFeed />
      </div>

      <div>
        <NewFeedAlarm
          onClick={scrollTop}
          data={AlarmMessage}
          onEffect={subscribeToNewFeeds}
        />
      </div>

      {data.feeds.feedItems.map((feed, idx) => {
        return feed && feed.feed && feed.feed.createdAt ? (
          <Feed
            key={getDate(feed.feed.createdAt).toISOString() + idx}
            content={feed.feed.content}
            feedinfo={feed}
            createdAt={getDate(feed.feed.createdAt).toISOString()}
          />
        ) : (
          <></>
        );
      })}

      {data && data.feeds && data.feeds.cursor ? (
        <LoadCheckContainer
          onClick={fetchMoreFeed}
          ref={setRef as any}></LoadCheckContainer>
      ) : (
        <></>
      )}

      <NoFeed></NoFeed>
    </>
  );
};

export default FeedList;
