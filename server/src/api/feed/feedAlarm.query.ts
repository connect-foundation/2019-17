import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseDB';
import { QueryResolvers, Alarm } from '../../types';
import {
  GET_FEED_ARALMS,
  ALARM_ISCHECKED_COUNT
} from '../../schema/feed/query';

const queryResolvers: QueryResolvers = {
  alarms: async (_, __, { req }): Promise<Alarm[]> => {
    isAuthenticated(req);
    const userEmail = req.email;
    const result = await requestDB(GET_FEED_ARALMS, {
      userEmail
    });

    const [parsedAlarms] = parseResultRecords(result);
    return parsedAlarms.alarms;
  },
  alarmCount: async (_, __, { req }): Promise<number> => {
    isAuthenticated(req);
    const userEmail = req.email;

    const result = await requestDB(ALARM_ISCHECKED_COUNT, {
      userEmail
    });

    const [parsedAlarmCount] = parseResultRecords(result);

    return Number(parsedAlarmCount.alarmCount);
  }
};

export default queryResolvers;
