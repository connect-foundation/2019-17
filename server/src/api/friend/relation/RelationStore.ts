import { None } from './None';
import { Request } from './Request';
import { RequestedFrom } from './RequestedFrom';
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
        return new RequestedFrom();
      default:
        return new Friend();
    }
  }
}
