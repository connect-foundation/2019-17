import { QueryResolvers, QueryGetUserArgs, User } from '../../types';
import isAuthenticated from '../../utils/isAuthenticated';
import createDBError from '../../errors/createDBError';
import { requestDB, getUserInfoByEmail } from '../../utils/requestDB';
import {
  FIND_USER_BY_EMAIL_QUERY,
  FIND_FRIENDS_QUERY,
  FIND_RELATIONSHIP_BY_USER
} from '../../schema/user/query';
import { getFirstKeyValue } from '../../utils/parseData';
import { socketCountWithEmail } from '../../utils/socketManager';
import { parseResultRecords } from '../../utils/parseData';

const queryResolvers: QueryResolvers = {
  getFriends: async (_, __, { req }): Promise<any[]> => {
    isAuthenticated(req);
    try {
      const result = await requestDB(FIND_FRIENDS_QUERY, {
        email: req.email
      });
      const friends = await parseResultRecords(result);

      return friends.map(({ friend: user }) => {
        user.status = socketCountWithEmail.has(user.email)
          ? 'online'
          : 'offline';
        return user;
      });
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  getFriendsByUserEmail: async (_, { email }, { req }): Promise<User[]> => {
    isAuthenticated(req);
    try {
      const result = await requestDB(FIND_FRIENDS_QUERY, { email });
      const friends = parseResultRecords(result);

      return friends.map(({ friend }) => friend);
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  findRelation: async (_, { email: userEmail }, { req }) => {
    isAuthenticated(req);
    const result = await requestDB(FIND_RELATIONSHIP_BY_USER, {
      myEmail: req.email,
      userEmail
    });
    const relation = await getFirstKeyValue(result);
    return relation;
  },
  me: async (_, __, { req }): Promise<User> => {
    isAuthenticated(req);
    const user = await getUserInfoByEmail(req.email);
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
      const result = await requestDB(FIND_USER_BY_EMAIL_QUERY, { email });
      const [parsedResults] = parseResultRecords(result);
      return parsedResults ? parsedResults.user : null;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default queryResolvers;
