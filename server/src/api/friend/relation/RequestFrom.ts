import { Relation } from './Relation';
import { ACCEPT_FRIEND_REQUEST_BY_EMAIL } from '../../../schema/friend/query';

export class RequestFrom extends Relation {
  getQuery() {
    return ACCEPT_FRIEND_REQUEST_BY_EMAIL;
  }
}
