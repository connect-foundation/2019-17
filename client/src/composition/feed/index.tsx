import React, { useState, useMemo } from "react";
import Feed from "./Feed";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import useScrollEnd from "../../hooks/useScrollEnd";
interface IFeed {
  content: string;
  createdAt: string;
}

interface Feeds {
  feeds: IFeed[];
}

const GET_FEEDS = gql`
  query getfeeds($first: Int, $after: Int, $currentCursor: String) {
    feeds(first: $first, after: $after, cursor: $currentCursor) {
      content
      createdAt
    }
  }
`;

interface FeedVars {
  first: number;
  after: number;
  currentCursor: string;
}
const OFFSET = 2;
const FeedContainer = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [cursorIdx, setCursorIdx] = useState<number>(0);

  const checkEnd = useScrollEnd();
  // hooks 에서 useQuery 1 부터 시작
  const { loading, data, fetchMore } = useQuery<Feeds, FeedVars>(GET_FEEDS, {
    variables: { first: cursorIdx, after: OFFSET, currentCursor: cursor }
  });

  useMemo(() => {
    if (data) {
      // setFeeds([...feeds, ...data.feeds]);
    }
  }, [data]);

  const fetchMoreFeed = async () => {
    const { data: value } = await fetchMore({
      variables: {
        first: OFFSET,
        after: cursorIdx,
        currentCursor: cursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        } else {
          setCursorIdx(OFFSET + cursorIdx);
        }

        return Object.assign({}, prev, {
          feed: [...prev.feeds, ...fetchMoreResult.feeds]
        });
      }
    });
    setFeeds([...feeds, ...value.feeds]);
  };

  const checkEndFeed = () => {
    fetchMoreFeed();

    return null;
  };

  return (
    <>
      {feeds.map(feed => (
        <Feed content={feed.content} createdAt={feed.createdAt} />
      ))}

      <span onClick={fetchMoreFeed}>click</span>
      {checkEnd ? checkEndFeed() : (() => {})()}
    </>
  );
};

export default FeedContainer;
