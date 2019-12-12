import React from 'react';
import CommonModal from './CommonModal';
import Feed from '../Feed/Feed';
import { useGetfeedsQuery } from 'react-components.d';
import { getDate } from 'utils/dateUtil';
import styled from 'styled-components';

const ModalFeed = styled(Feed)`
  border: none;
  border-radius: 0px;
`;
const DetailFeed: React.FC = () => {
  const { data } = useGetfeedsQuery({
    variables: { first: 1, currentCursor: '9999-12-31T09:29:26.050Z' }
  });

  const valuecheck = () => {
    return data && data.feeds && data.feeds.feedItems
      ? data.feeds.feedItems.map((feed, idx) => {
          return feed && feed.feed && feed.feed.createdAt ? (
            <ModalFeed
              key={getDate(feed.feed.createdAt).toISOString() + idx}
              content={feed.feed.content}
              feedinfo={feed}
              createdAt={getDate(feed.feed.createdAt).toISOString()}
              feedSize={'30rem'}
            />
          ) : (
            <></>
          );
        })
      : '';
  };
  return <CommonModal textChildren={valuecheck()} imageChildren={<></>} />;
};

export default DetailFeed;
