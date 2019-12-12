import React from 'react';
import CommonModal from './CommonModal';
import Feed from '../Feed/Feed';
import { useGetfeedQuery } from 'react-components.d';
import { getDate } from 'utils/dateUtil';
import styled from 'styled-components';

const ModalFeed = styled(Feed)`
  border: none;
  border-radius: 0px;
`;
interface Iprops {
  isOpen: boolean;
  feedId: number;
  closeModal: () => void;
}
const DetailFeed = ({ isOpen, feedId, closeModal }: Iprops) => {
  const { data } = useGetfeedQuery({
    variables: { feedId: feedId && Number(feedId) }
  });

  const valuecheck = () => {
    const feed = data && data.feed;
    return (
      feed &&
      feed.feed &&
      feed.feed.createdAt && (
        <ModalFeed
          key={getDate(feed.feed.createdAt).toISOString()}
          content={feed.feed.content}
          feedinfo={feed}
          createdAt={getDate(feed.feed.createdAt).toISOString()}
          feedSize={'30rem'}
        />
      )
    );
  };
  return (
    <CommonModal
      isOpen={isOpen}
      textChildren={valuecheck()}
      imageChildren={<></>}
      closeModal={closeModal}
    />
  );
};

export default DetailFeed;
