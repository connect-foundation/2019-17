import { QueryResolvers, QueryGetUserArgs, User } from '../../types';
import isAuthenticated from '../../utils/isAuthenticated';
import { requestDB, getUserInfoByEmail } from '../../utils/requestDB';
import {
  FIND_USER_BY_EMAIL_QUERY,
  FIND_FRIENDS_QUERY,
  FIND_RELATIONSHIP_BY_USER
} from '../../schema/user/query';
import { getFirstKeyValue, parseResultRecords } from '../../utils/parseDB';
import { socketCountWithEmail } from '../../utils/socketManager';
import UserNotFoundError from '../../errors/UserNotFound';

const queryResolvers: QueryResolvers = {
  getFriends: async (_, __, { req }): Promise<any[]> => {
    isAuthenticated(req);
    const result = await requestDB(FIND_FRIENDS_QUERY, {
      email: req.email
    });
    const friends = parseResultRecords(result);

    return friends.map(({ friend: user }) => {
      user.status = socketCountWithEmail.has(user.email) ? 'online' : 'offline';
      return user;
    });
  },
  getFriendsByUserEmail: async (_, { email }, { req }): Promise<User[]> => {
    isAuthenticated(req);
    const result = await requestDB(FIND_FRIENDS_QUERY, { email });
    const friends = parseResultRecords(result);

    return friends.map(({ friend }) => friend);
  },
  findRelation: async (_, { email: userEmail }, { req }): Promise<string> => {
    isAuthenticated(req);
    const result = await requestDB(FIND_RELATIONSHIP_BY_USER, {
      myEmail: req.email,
      userEmail
    });
    const relation = getFirstKeyValue(result);
    return relation;
  },
  me: async (_, __, { req }): Promise<User> => {
    isAuthenticated(req);
    const user = await getUserInfoByEmail(req.email);
    if (user) return user;
    throw new UserNotFoundError();
  },
  getUser: async (
    _,
    { email }: QueryGetUserArgs,
    { req }
  ): Promise<User | null> => {
    isAuthenticated(req);
    const result = await requestDB(FIND_USER_BY_EMAIL_QUERY, { email });
    const [parsedResults] = parseResultRecords(result);
    return parsedResults ? parsedResults.user : null;
  }
};

export default queryResolvers;
