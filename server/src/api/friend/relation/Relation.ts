export abstract class Relation {
  getQuery() {}

  publish(pubsub, payload) {}

  checkState(email, targetEmail) {}
}
