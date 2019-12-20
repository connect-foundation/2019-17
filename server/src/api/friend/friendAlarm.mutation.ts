import { requestDB } from '../../utils/requestDB';
import { CHANGE_ALL_REQUEST_READ_STATE_BY_EMAIL } from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';

export const Mutation = {
  changeAllRequestReadState: async (_, __, { req }) => {
    isAuthenticated(req);

    await requestDB(CHANGE_ALL_REQUEST_READ_STATE_BY_EMAIL, {
      email: req.email
    });

    return true;
  }
};
