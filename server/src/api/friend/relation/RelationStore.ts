import { None } from './None';
import { Request } from './Request';
import { RequestFrom } from './RequestFrom';
import { Friend } from './Friend';

export class RelationStore {
  private relation;

  constructor(relation: string) {
    this.relation = relation;
  }

  getNextRelation() {
    switch (this.relation) {
      case 'NONE':
        return new None();
      case 'REQUEST':
        return new Request();
      case 'REQUESTED_FROM':
        return new RequestFrom();
      default:
        return new Friend();
    }
  }
}
