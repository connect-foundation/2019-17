import React, { useEffect } from 'react';
import MessageTabPresenter from './AlarmTabPresenter';
import { useChangeAllFeedAlarmCheckStateMutation } from 'react-components.d';
import { GET_CHECK_STATE_COUNT } from './alarm.query';

interface Iprops {
  selected: boolean;
}
function AlarmTabContainer({ selected }: Iprops) {
  const [changeAllCheckTrue] = useChangeAllFeedAlarmCheckStateMutation({
    update(cache) {
      cache.writeQuery({
        query: GET_CHECK_STATE_COUNT,
        data: { alarmCount: 0 }
      });
    }
  });
  useEffect(() => {
    if (selected) {
      changeAllCheckTrue();
    }
  }, [selected]);
  return <MessageTabPresenter />;
}

export default AlarmTabContainer;
