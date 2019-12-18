import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CHANGE_ALARM_READSTATE,
  CHANGE_ALL_ALARM_READSTATE,
  CHANGE_ALL_ALARM_CHECKSTATE
} from '../../schema/feed/query';
import { MutationResolvers } from '../../types';
import createDBError from '../../errors/createDBError';

const mutationResolvers: MutationResolvers = {
  changeFeedAlarmReadState: async (_, { feedId }, { req }): Promise<number> => {
    isAuthenticated(req);
    const userEmail = req.email;
    try {
      await requestDB(CHANGE_ALARM_READSTATE, {
        userEmail,
        feedId,
        isRead: true
      });
      return feedId;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  changeAllFeedAlarmReadState: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;
    try {
      await requestDB(CHANGE_ALL_ALARM_READSTATE, {
        userEmail,
        isRead: true
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  changeAllFeedAlarmCheckState: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;

    try {
      await requestDB(CHANGE_ALL_ALARM_CHECKSTATE, {
        userEmail,
        isCheckd: true
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default mutationResolvers;
