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
          feedinfo={feed}
          createdAt={getDate(createdAt).toISOString()}
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
