import React, { useCallback } from 'react';
import CommonModal from './CommonModal';
import Feed from '../Feed/Feed';
import { useGetfeedQuery, IFeed } from 'react-components.d';
import { getDate } from 'utils/dateUtil';
import styled from 'styled-components';
import ImageContainer from 'composition/Feed/ImageContainer';

const ModalFeed = styled(Feed)`
  border: none;
  border-radius: 0px;
`;
interface Iprops {
  isOpen: boolean;
  feedId: number;
  closeModal: () => void;
}

const resetFeed = (feed: IFeed) => {
  const tempFeed = Object.assign({}, feed);
  if (tempFeed && tempFeed.imglist !== undefined) {
    delete tempFeed.imglist;
  }
  return tempFeed;
};
const DetailFeed = ({ isOpen, feedId, closeModal }: Iprops) => {
  const { data } = useGetfeedQuery({
    variables: { feedId: feedId && Number(feedId) }
  });

  const getTextFeed = () => {
    const feed = data && data.feed;
    if (!data || !data.feed || !data.feed.feed) {
      return;
    }
    const { createdAt, content } = data.feed.feed;

    return (
      feed &&
      createdAt && (
        <ModalFeed
          content={content}
          feedinfo={resetFeed(feed)}
          createdAt={getDate(createdAt).toISOString()}
          feedSize={'30rem'}
        />
      )
    );
  };

  const getFeedModalImages = useCallback(() => {
    if (!data || !data.feed || !data.feed.feed) {
      return;
    }
    return (
      <ImageContainer images={data.feed.imglist} width="500px" height="400px" />
    );
  }, [data]);

  return (
    <CommonModal
      isOpen={isOpen}
      textChildren={getTextFeed()}
      imageChildren={getFeedModalImages()}
      closeModal={closeModal}
    />
  );
};

export default DetailFeed;
