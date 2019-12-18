import { Relation } from './Relation';
import {
  ACCEPT_FRIEND_REQUEST_BY_EMAIL,
  IS_REQUEST_EXIST
} from '../../../schema/friend/query';
import { requestDB } from '../../../utils/requestDB';
import NoRequestError from '../../../errors/NoRequestError';

export class RequestedFrom extends Relation {
  getQuery() {
    return ACCEPT_FRIEND_REQUEST_BY_EMAIL;
  }

  async checkState(email, targetEmail) {
    const res = await requestDB(IS_REQUEST_EXIST, {
      email,
      targetEmail
    });

    if (res[0].get(0) === 'FALSE') throw new NoRequestError();
  }
}
