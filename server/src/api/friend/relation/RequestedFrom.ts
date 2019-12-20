import { Relation } from './Relation';
import {
  ACCEPT_FRIEND_REQUEST_BY_EMAIL,
  IS_REQUEST_EXIST
} from '../../../schema/friend/query';
import { requestDB, getUserInfoByEmail } from '../../../utils/requestDB';
import NoRequestError from '../../../errors/NoRequestError';
import { loginPublish } from '../../auth/auth.pubsub';
import { getFirstKeyValue } from '../../../utils/parseDB';

export class RequestedFrom extends Relation {
  getQuery() {
    return ACCEPT_FRIEND_REQUEST_BY_EMAIL;
  }

  async checkState(email, targetEmail) {
    const res = await requestDB(IS_REQUEST_EXIST, {
      email,
      targetEmail
    });

    if (getFirstKeyValue(res) === 'FALSE') throw new NoRequestError();
  }

  async publish(pubsub, { email }) {
    const user = await getUserInfoByEmail(email);

    loginPublish({ ...user, status: 'online' });
  }
}
