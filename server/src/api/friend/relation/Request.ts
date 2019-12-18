import { Relation } from './Relation';
import { CANCEL_FRIEND_REQUEST_BY_EMAIL } from '../../../schema/friend/query';
import { getUserInfoByEmail } from '../../../utils/requestDB';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export class Request extends Relation {
  getQuery() {
    return CANCEL_FRIEND_REQUEST_BY_EMAIL;
  }

  async publish(pubsub, { email, targetEmail }) {
    const user = await getUserInfoByEmail(email);

    pubsub.publish(REQUEST_ALARM_ADDED, {
      requestAlarmAdded: {
        ...user,
        targetEmail,
        action: 'DELETED'
      }
    });
  }
}
