import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import {
  CHANGE_ALARM_READSTATE,
  CHANGE_ALL_ALARM_READSTATE,
  CHANGE_ALL_ALARM_CHECKSTATE
} from '../../schema/feed/query';
import { MutationResolvers } from '../../types';

const mutationResolvers: MutationResolvers = {
  changeFeedAlarmReadState: async (_, { feedId }, { req }): Promise<number> => {
    isAuthenticated(req);
    const userEmail = req.email;
    await requestDB(CHANGE_ALARM_READSTATE, {
      userEmail,
      feedId,
      isRead: true
    });
    return feedId;
  },
  changeAllFeedAlarmReadState: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;
    await requestDB(CHANGE_ALL_ALARM_READSTATE, {
      userEmail,
      isRead: true
    });
    return true;
  },
  changeAllFeedAlarmCheckState: async (_, __, { req }): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;
    await requestDB(CHANGE_ALL_ALARM_CHECKSTATE, {
      userEmail,
      isCheckd: true
    });
    return true;
  }
};

export default mutationResolvers;
