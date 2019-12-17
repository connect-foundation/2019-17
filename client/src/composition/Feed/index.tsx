import React, { useState } from 'react';
import Feed from './Feed';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import WritingFeed from './WritingFeed';
import NewFeedAlarm from './NewFeedAlarm';
import NoFeed from './NoFeed';
import {
  useGetfeedsQuery,
  useMeQuery,
  GetfeedsQuery
} from 'react-components.d';
import { getDate, fullDateFormat } from 'utils/dateUtil';
import { FEEDS_SUBSCRIPTION } from './feed.query';
import { MAX_DATE } from '../../Constants';
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

const checkCursor = (newCursor, prevCursor) => {
  if (newCursor === prevCursor) {
    return '';
  }
  return newCursor;
};

const OFFSET = 4;
const ALARM_LIMIT = 0;

const FeedList: React.FC = () => {
  const [, setRef] = useIntersect(fetchMoreFeed, () => {}, {});
  const [, setTopRef] = useIntersect(feedAlarmOff, feedAlarmOn, {});

  const [feedAlarm, setFeedAlarm] = useState(0);
  const [AlarmMessage, setAlarmMessage] = useState('');
  const { data: myInfo } = useMeQuery();

  const { data, fetchMore, subscribeToMore, loading } = useGetfeedsQuery({
    variables: { first: OFFSET, currentCursor: MAX_DATE }
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
      updateQuery: (
        prev: GetfeedsQuery,
        { fetchMoreResult }: { fetchMoreResult: GetfeedsQuery }
      ) => {
        const {
          feeds: { feedItems, cursor: newCursor }
        } = fetchMoreResult;

        let finalCursor = checkCursor(newCursor, prev.feeds.cursor);

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

  if (loading) {
    return (
      <LoadContainer>
        <Loader />
      </LoadContainer>
    );
  }

  if (!data || !data.feeds || !data.feeds.feedItems) return <>ERROR</>;

  return (
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
        return (
          feed &&
          feed.feed &&
          feed.feed.createdAt && (
            <Feed
              key={getDate(feed.feed.createdAt).toISOString() + idx}
              content={feed.feed.content}
              feedinfo={feed}
              createdAt={fullDateFormat(getDate(feed.feed.createdAt))}
            />
          )
        );
      })}

      {data.feeds.cursor && (
        <LoadCheckContainer
          onClick={fetchMoreFeed}
          ref={setRef as any}></LoadCheckContainer>
      )}

      <NoFeed></NoFeed>
    </>
  );
};

export default FeedList;
