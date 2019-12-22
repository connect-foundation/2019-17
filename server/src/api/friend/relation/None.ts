import { Relation } from './Relation';
import {
  SEND_FRIEND_REQUEST_BY_EMAIL,
  IS_REQUEST_EXIST
} from '../../../schema/friend/query';
import { getUserInfoByEmail, requestDB } from '../../../utils/requestDB';
import RequestAlreadyExistError from '../../../errors/RequestAlreadyExistError';
import { getFirstKeyValue } from '../../../utils/parseDB';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export class None extends Relation {
  getQuery() {
    return SEND_FRIEND_REQUEST_BY_EMAIL;
  }

  async publish(pubsub, { email, targetEmail }) {
    const user = await getUserInfoByEmail(email);

    await pubsub.publish(REQUEST_ALARM_ADDED, {
      requestAlarmAdded: {
        ...user,
        targetEmail,
        action: 'ADDED'
      }
    });
  }

  async checkState(email, targetEmail) {
    const res = await requestDB(IS_REQUEST_EXIST, {
      email: targetEmail,
      targetEmail: email
    });

    if (getFirstKeyValue(res) === 'TRUE') throw new RequestAlreadyExistError();
  }
}
