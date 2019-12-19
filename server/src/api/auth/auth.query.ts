import { QueryResolvers } from '../../types';
import { getUserWithStatus } from '../../utils/requestDB';
import { loginPublish } from './auth.pubsub';
import isAuthenticated from '../../utils/isAuthenticated';

const queryResolvers: QueryResolvers = {
  loginUser: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    const user = await getUserWithStatus(req.email, 'online');
    loginPublish(user);
    return true;
  }
};

export default queryResolvers;
