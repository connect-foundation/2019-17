import { MutationRequestFriendArgs } from '../../types';
import { requestDB } from '../../utils/requestDB';
import {
  sendFriendRequestByEmailQuery,
  acceptFriendRequestByEmailQuery,
  cancelFriendRequestByEmailQuery,
  cancelFriendByEmailQuery,
  findUserByRequestRelation,
  findUserByNoRelation
} from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords, gatherValuesByKey } from '../../utils/parseData';

function getQueryByRelation(relation: string) {
  if (relation === 'NONE') {
    return sendFriendRequestByEmailQuery;
  } else if (relation === 'REQUEST') {
    return cancelFriendRequestByEmailQuery;
  } else if (relation === 'REQUESTED_FROM') {
    return acceptFriendRequestByEmailQuery;
  } else {
    return cancelFriendByEmailQuery;
  }
}

export default {
  Query: {
    getFriendAlarm: async (_, __, { req }) => {
      isAuthenticated(req);

      const reqUsers = await requestDB(findUserByRequestRelation, {
        email: req.email
      });
      const recUsers = await requestDB(findUserByNoRelation, {
        email: req.email
      });

      const parsedReq = parseResultRecords(reqUsers);
      const parsedRec = parseResultRecords(recUsers);

      return {
        requestedUser: gatherValuesByKey(parsedReq, 'u'),
        friendRecommendation: gatherValuesByKey(parsedRec, 'target')
      };
    }
  },
  Mutation: {
    requestFriend: async (
      _,
      { targetEmail, relation }: MutationRequestFriendArgs,
      { req }
    ) => {
      isAuthenticated(req);

      await requestDB(getQueryByRelation(relation), {
        email: req.email,
        targetEmail
      });

      return true;
    }
  }
};
