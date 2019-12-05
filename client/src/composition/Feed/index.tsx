import React, { useState } from 'react';
import Feed from './Feed';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import WritingFeed from './WritingFeed';
import NewFeedAlarm from './NewFeedAlarm';
import { useGetfeedsQuery, useMeQuery } from 'react-components.d';
import { getDate } from '../../utils/dateUtil';
import { FEEDS_SUBSCRIPTION } from './feed.query';

const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

const OFFSET = 4;
const ALARM_LIMIT = 0;
const FeedList = () => {
  const [_, setRef] = useIntersect(fetchMoreFeed, () => {}, {});
  const [__, setTopRef] = useIntersect(feedAlarmOff, feedAlarmOn, {});

  const [feedAlarm, setFeedAlarm] = useState(0);
  const [AlarmMessage, setAlarmMessage] = useState('');
  const { data: myInfo } = useMeQuery();
  const { data, fetchMore, subscribeToMore } = useGetfeedsQuery({
    variables: { first: OFFSET, currentCursor: '9999-12-31T09:29:26.050Z' },
    fetchPolicy: 'network-only'
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

        setFeedAlarm(props => props + 1);
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
      <div ref={setTopRef as any}>
        <WritingFeed />
      </div>

      <div>
        <NewFeedAlarm
          onClick={scrollTop}
          data={AlarmMessage}
          onEffect={subscribeToNewComments}
        />
      </div>

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

      {data ? (
        <LoadCheckContainer
          onClick={fetchMoreFeed}
          ref={setRef as any}></LoadCheckContainer>
      ) : (
        <></>
      )}

      <div>is End</div>
    </>
  );
};

export default FeedList;
