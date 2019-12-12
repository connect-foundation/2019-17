import React from 'react';
import CommonModal from './CommonModal';
import Feed from '../Feed/Feed';
import { useGetfeedQuery, IFeed } from 'react-components.d';
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

  const filterImage = (feed: IFeed) => {
    console.log('feedfeedfeed', feed);
    if (feed && feed.imglist !== undefined) {
      delete feed.imglist;
    }

    return feed;
  };
  const getTextFeed = () => {
    const feed = data && data.feed;
    const filteredFeed = filterImage(feed as IFeed);
    return (
      feed &&
      feed.feed &&
      feed.feed.createdAt && (
        <ModalFeed
          content={feed.feed.content}
          feedinfo={filteredFeed}
          createdAt={getDate(feed.feed.createdAt).toISOString()}
          feedSize={'30rem'}
        />
      )
    );
  };
  return (
    <CommonModal
      isOpen={isOpen}
      textChildren={getTextFeed()}
      imageChildren={<></>}
      closeModal={closeModal}
    />
  );
};

export default DetailFeed;
