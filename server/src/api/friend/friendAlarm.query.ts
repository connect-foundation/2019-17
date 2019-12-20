import { requestDB } from '../../utils/requestDB';
import {
  COUNT_UNREAD_REQUEST_BY_EMAIL,
  FIND_USER_BY_REQUEST_RELATION,
  FIND_USER_BY_NO_RELATION
} from '../../schema/friend/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseData';
import { getFirstKeyValue } from '../../utils/parseDB';

export const Query = {
  requestAlarm: async (_, __, { req }) => {
    isAuthenticated(req);

    const reqUsers = await requestDB(FIND_USER_BY_REQUEST_RELATION, {
      email: req.email
    });

    const parsedReq = parseResultRecords(reqUsers);

    return parsedReq[0].user;
  },

  recommendAlarm: async (_, __, { req }) => {
    isAuthenticated(req);

    const recUsers = await requestDB(FIND_USER_BY_NO_RELATION, {
      email: req.email
    });

    const parsedRec = parseResultRecords(recUsers);

    return parsedRec[0].target;
  },

  friendUnreadAlarmNum: async (_, __, { req }) => {
    isAuthenticated(req);

    const countRes = await requestDB(COUNT_UNREAD_REQUEST_BY_EMAIL, {
      email: req.email
    });

    return String(getFirstKeyValue(countRes));
  }
};
