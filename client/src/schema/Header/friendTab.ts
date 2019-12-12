import { UserInfoWithTarget } from 'react-components.d';

export interface IRequestAlarm {
  requestAlarm: [UserInfoWithTarget];
}

export interface ISubscription {
  subscriptionData: IData;
}

interface IData {
  data: IReqAdded;
}

interface IReqAdded {
  requestAlarmAdded: UserInfoWithTarget;
}
