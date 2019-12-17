import { Relation } from './Relation';
import { CANCEL_FRIEND_BY_EMAIL } from '../../../schema/friend/query';

export class Friend extends Relation {
  getQuery() {
    return CANCEL_FRIEND_BY_EMAIL;
  }
}
