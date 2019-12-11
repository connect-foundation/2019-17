import React, { useEffect } from 'react';
import MessageTabPresenter from './AlarmTabPresenter';
import { useChangeAllFeedAlarmCheckStateMutation } from 'react-components.d';
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
        type: 'RESET_ALARM_CNT'
      });
    }
  }, [selected]);
  return <MessageTabPresenter selected={selected} />;
}

export default AlarmTabContainer;
