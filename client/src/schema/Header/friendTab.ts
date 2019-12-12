import { FriendAlarmUser } from 'react-components.d';

export interface IRequestAlarm {
  requestAlarm: [FriendAlarmUser];
}

export interface ISubscription {
  subscriptionData: IData;
}

interface IData {
  data: IReqAdded;
}

interface IReqAdded {
  requestAlarmAdded: FriendAlarmUser;
}
