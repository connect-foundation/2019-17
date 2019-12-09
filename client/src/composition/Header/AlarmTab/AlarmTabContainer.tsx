import React from 'react';
import MessageTabPresenter from './AlarmTabPresenter';
interface Iprops {
  selected: boolean;
}
function AlarmTabContainer({ selected }: Iprops) {
  return selected ? <MessageTabPresenter /> : <></>;
}

export default AlarmTabContainer;
