import React, { useEffect } from 'react';
import MessageTabPresenter from './AlarmTabPresenter';
import { useChangeAllFeedAlarmCheckStateMutation } from 'react-components.d';
import { GET_CHECK_STATE_COUNT } from './alarm.query';
import { useHeaderTabCountDispatch } from 'stores/HeaderTabCountContext';

interface Iprops {
  selected: boolean;
}
function AlarmTabContainer({ selected }: Iprops) {
  const headerTabCountDispatch = useHeaderTabCountDispatch();
  const [changeAllCheckTrue] = useChangeAllFeedAlarmCheckStateMutation();
  useEffect(() => {
    if (selected) {
      changeAllCheckTrue();
      headerTabCountDispatch({
        type: 'ADD_ALARM_CNT',
        key: { id: 'alarmCount', value: 0 }
      });
    }
  }, [selected]);
  return <MessageTabPresenter />;
}

export default AlarmTabContainer;
