import { useEffect } from 'react';
import React from 'react';
import { IFeedItem } from './feed.type';
interface Props {
  onEffect: () => void | (() => void);
  data: string;
}

const NewFeedAlarm = ({ onEffect, data }: Props) => {
  useEffect(() => {
    return onEffect();
  }, [onEffect]);

  if (data) {
    return <div>{data}</div>;
  } else {
    return (
      <>
        <div>WHAT?</div>
      </>
    );
  }
};

export default NewFeedAlarm;
