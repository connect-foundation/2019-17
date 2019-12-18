import { QueryResolvers } from '../../types';
import { getUserWithStatus } from '../../utils/requestDB';
import { loginPublish } from './auth.pubsub';
import isAuthenticated from '../../utils/isAuthenticated';
import createDBError from '../../errors/createDBError';

const queryResolvers: QueryResolvers = {
  loginUser: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    try {
      const user = await getUserWithStatus(req.email, 'online');
      loginPublish(user);
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default queryResolvers;
