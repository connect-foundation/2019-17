import React, { useState } from 'react';
import Feed from 'composition/Feed/Feed';
import useIntersect from 'hooks/useIntersectObserver';
import styled from 'styled-components';
import WritingFeed from 'composition/Feed/WritingFeed';
import NewFeedAlarm from 'composition/Feed/NewFeedAlarm';
import {
  useGetUserFeedsQuery,
  useMeQuery,
  GetUserFeedsQuery
} from 'react-components.d';
import Loader from 'components/Loader';
import { getDate, fullDateFormat } from 'utils/dateUtil';
import { USER_FEEDS_SUBSCRIPTION } from 'composition/Feed/feed.query';
import { MAX_DATE } from 'Constants';
import { scrollTop } from 'utils/scroll';

const OFFSET = 4;
const ALARM_LIMIT = 0;

const LoadCheckContainer = styled.div`
  height: 50px;
  position: relative;
  top: -50px;
`;

const LoadContainer = styled.div`
  width: 100%;
  height: 10rem;
`;

const checkCursor = (newCursor, prevCursor) =>
  newCursor === prevCursor ? '' : newCursor;

const UserFeedList: React.FC = ({ email }: { email: string; children: 0 }) => {
  const [, setRef] = useIntersect(fetchMoreFeed, () => {}, {});
  const [, setTopRef] = useIntersect(feedAlarmOff, feedAlarmOn, {});

  const [feedAlarm, setFeedAlarm] = useState(0);
  const [AlarmMessage, setAlarmMessage] = useState('');
  const { data: { me = null } = {} } = useMeQuery();
  const {
    data: { feeds = null } = {},
    fetchMore,
    subscribeToMore,
    loading
  } = useGetUserFeedsQuery({
    variables: {
      first: OFFSET,
      currentCursor: MAX_DATE,
      email
    }
  });

  function feedAlarmOn() {
    if (feedAlarm > ALARM_LIMIT) {
      setAlarmMessage(`새 피드 ${feedAlarm} 개`);
    } else {
      setAlarmMessage('');
    }
  }

  function feedAlarmOff() {
    setFeedAlarm(0);
    setAlarmMessage('');
  }

  async function fetchMoreFeed() {
    await fetchMore({
      variables: {
        first: OFFSET,
        currentCursor: feeds ? feeds.cursor : '',
        email
      },
      updateQuery: (
        prev: GetUserFeedsQuery,
        { fetchMoreResult }: { fetchMoreResult: GetUserFeedsQuery }
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
      document: USER_FEEDS_SUBSCRIPTION,
      variables: { userEmail: email },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { data: newFeeds } = subscriptionData;

        const {
          feeds: { feedItems, cursor }
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

  if (!feeds || !feeds.feedItems) return <>ERROR</>;

  return (
    <>
      {me && me.email === email && (
        <div ref={setTopRef as any}>
          <WritingFeed />
        </div>
      )}

      <div>
        <NewFeedAlarm
          onClick={scrollTop}
          data={AlarmMessage}
          onEffect={subscribeToNewFeeds}
        />
      </div>

      {feeds.feedItems.map((feed, idx) => {
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

      {feeds.cursor && (
        <LoadCheckContainer
          onClick={fetchMoreFeed}
          ref={setRef as any}></LoadCheckContainer>
      )}
    </>
  );
};

export default UserFeedList;
