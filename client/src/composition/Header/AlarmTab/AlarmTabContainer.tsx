import React from 'react';
import MessageTabPresenter from './AlarmTabPresenter';
interface Iprops {
  selected: boolean;
}
function AlarmTabContainer({ selected }: Iprops) {
  return <MessageTabPresenter />;
}

export default AlarmTabContainer;
