import { GET_NEW_FEED, GET_NEW_ARALM } from '../../schema/feed/query';
import { requestDB } from '../../utils/requestDB';
import { parseResultRecords } from '../../utils/parseData';
import { NEW_FEED, NEW_ALARM } from './constant';

export const publishFeed = async (pubsub, feedId, email) => {
  const registerdFeed = await requestDB(GET_NEW_FEED, {
    feedId,
    userEmail: email
  });

  const parsedRegisterdFeed = parseResultRecords(registerdFeed);
  pubsub.publish(NEW_FEED, {
    feeds: {
      cursor: '',
      feedItems: parsedRegisterdFeed
    }
  });
};

export const publishFeedAlarm = async (pubsub, alarmId, userEmail) => {
  const registerdAlarm = await requestDB(GET_NEW_ARALM, {
    alarmId: Number(alarmId),
    userEmail
  });

  const [parsedRegisterdAlarm] = parseResultRecords(registerdAlarm);

  pubsub.publish(NEW_ALARM, {
    alarms: parsedRegisterdAlarm.alarms
  });
};
