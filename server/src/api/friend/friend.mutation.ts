import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { REJECT_FRIEND_REQUEST_BY_EMAIL } from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { RelationStore } from './relation/RelationStore';

const REQUEST_ALARM_ADDED = 'REQUEST_ALARM_ADDED';

export const Mutation = {
  requestFriend: async (
    _,
    { targetEmail, relation }: MutationRequestFriendArgs,
    { req, pubsub }
  ) => {
    isAuthenticated(req);

    const relStore = new RelationStore(relation);
    const nextRelation = relStore.getNextRelation();

    await nextRelation.checkState(req.email, targetEmail);

    await requestDB(nextRelation.getQuery(), {
      email: req.email,
      targetEmail
    });

    await nextRelation.publish(pubsub, { email: req.email, targetEmail });

    return true;
  },

  rejectFriendRequest: async (_, { targetEmail }, { req, pubsub }) => {
    isAuthenticated(req);

    await requestDB(REJECT_FRIEND_REQUEST_BY_EMAIL, {
      email: req.email,
      targetEmail
    });

    await pubsub.publish(REQUEST_ALARM_ADDED, {
      requestAlarmAdded: {
        nickname: 'deletedUser',
        email: targetEmail,
        targetEmail: req.email,
        action: 'DELETED'
      }
    });

    return true;
  }
};
