import { withFilter } from 'graphql-subscriptions';
import { LOGIN_CHANNEL, LOGOUT_CHANNEL } from './channels';
import { requestDB } from '../../utils/requestDB';
import {
  FIND_USER_WITH_EMAIL_QUERY,
  FIND_FRIENDS_QUERY,
  CHECK_FRIEND_QUERY,
  FIND_RELATIONSHIP_WITH_USER
} from '../../schema/user/query';
import { getNode, getFirstKeyValue } from '../../utils/parseDB';
import { socketCountWithEmail } from '../../utils/socketManager';
import { findUserWithEmail } from '../../schema/user/user';
import { QueryResolvers, QueryGetUserArgs, User } from '../../types';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseData';
import createDBError from '../../errors/createDBError';

const Query: QueryResolvers = {
  friends: async (_, __, { req }): Promise<any[]> => {
    const result = await requestDB(FIND_FRIENDS_QUERY, {
      email: req.email
    });
    const friends = await parseResultRecords(result);

    return friends.map(({ friends: user }) => {
      const { email } = user;

      user.status = socketCountWithEmail.has(email) ? 'online' : 'offline';
      return user;
    });
  },
  userWithEmail: async (_, { email }) => {
    const result = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
    const user = await getNode(result);
    return user;
  },
  friendsWithUserEmail: async (_, { email }): Promise<User[]> => {
    const result = await requestDB(FIND_FRIENDS_QUERY, { email });
    const friends = parseResultRecords(result);

    return friends.map(friend => friend.friends);
  },
  findRelation: async (_, { email: userEmail }, { req }) => {
    const result = await requestDB(FIND_RELATIONSHIP_WITH_USER, {
      myEmail: req.email,
      userEmail
    });
    const relation = await getFirstKeyValue(result);
    return relation;
  },
  me: async (_, __, { req }): Promise<User> => {
    isAuthenticated(req);
    const { email } = req;
    const user = await findUserWithEmail({ email });
    if (user) {
      return user;
    }
    throw Error('유저 정보를 찾을 수 없습니다.');
  },
  getUser: async (
    _,
    { email }: QueryGetUserArgs,
    { req }
  ): Promise<User | null> => {
    isAuthenticated(req);
    try {
      const result = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
      const [parsedResults] = parseResultRecords(result);
      return parsedResults ? parsedResults.user : null;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default {
  Query,
  Subscription: {
    updateUserState: {
      resolve: payload => payload,
      subscribe: withFilter(
        (_, __, { pubsub }) => {
          return pubsub.asyncIterator([LOGIN_CHANNEL, LOGOUT_CHANNEL]);
        },
        async (payload, _, { email }) => {
          
          const result = await requestDB(CHECK_FRIEND_QUERY, {
            email: payload.email,
            friendEmail: email
          });
          const friend = await getNode(result);
          return !!friend;
        }
      )
    }
  }
};
