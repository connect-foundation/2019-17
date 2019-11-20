import React, { useState, useMemo, useEffect } from "react";
import Feed from "./Feed";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { async } from "q";

interface IFeed {
  content: string;
}

interface Feeds {
  feeds: IFeed[];
}

const GET_FEEDS = gql`
  query getfeeds($first: Int, $after: Int) {
    feeds(first: $first, after: $after) {
      content
    }
  }
`;

interface FeedVars {
  first: number;
  after: number;
}
/* interface IFeed2 {
  nickname: string;
  profile: string;
  createdAt: string;
  content: string;
  commentCnt: number;
  shareCnt: number;
} */

const FeedContainer = () => {
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [cursor, setCursor] = useState<string>();
  // hooks 에서 useQuery 1 부터 시작
  const { loading, data, fetchMore } = useQuery<Feeds, FeedVars>(GET_FEEDS, {
    variables: { first: 2, after: 1 }
  });

  useMemo(() => {
    if (data) {
      setFeeds([...feeds, ...data.feeds]);
    }
  }, [data]);

  const fetchMoreFeed = async () => {
    const { data: value } = await fetchMore({
      variables: {
        first: 2,
        after: 3
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          feed: [...prev.feeds, ...fetchMoreResult.feeds]
        });
      }
    });
    setFeeds([...feeds, ...value.feeds]);
  };

  return (
    <>
      {feeds.map(feed => (
        <Feed content={feed.content} />
      ))}
      feeds
      <span onClick={fetchMoreFeed}>click</span>
    </>
  );
};

export default FeedContainer;
