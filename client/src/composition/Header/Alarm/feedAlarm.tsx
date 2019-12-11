import React from 'react';
import { useSubscribeFeedSubscription } from 'react-components.d';

const FeedAlarm = () => {
  const { data, loading } = useSubscribeFeedSubscription({
    variables: {
      userEmail: ''
    }
  });

  return (
    <>
      <div>feed alarms : </div>
    </>
  );
};

export default FeedAlarm;
