import ImageUploadError from '../../errors/ImageUploadError';
import createDBError from '../../errors/createDBError';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import isAuthenticated from '../../utils/isAuthenticated';
import { parseResultRecords } from '../../utils/parseData';
import {
  UPDATE_LIKE,
  DELETE_LIKE,
  WRITE_COMMENT,
  ALARM_NEW_FEED,
  CHANGE_ALARM_READSTATE,
  CHANGE_ALL_ALARM_READSTATE,
  ALARM_NEW_COMMENT,
  CHANGE_ALL_ALARM_CHECKSTATE
} from '../../schema/feed/query';

import {
  WRITING_FEED_QUERY,
  createImageNodeAndRelation
} from '../../schema/feed/query';

import {
  MutationResolvers,
  MutationEnrollFeedArgs,
  MutationWriteCommentArgs
} from '../../types';
import { publishFeed, publishFeedAlarm } from './feed.pubsub';

const getUpdateLikeQuery = count => (count > 0 ? UPDATE_LIKE : DELETE_LIKE);

const createImageQuery = fileLocations => {
  const matchQuery = `MATCH (f:Feed) WHERE ID(f) = $feedId `;
  let registerImageQuery = fileLocations.reduce((acc, { Location }, idx) => {
    acc += createImageNodeAndRelation(idx, Location);
    return acc;
  }, matchQuery);
  registerImageQuery += ' RETURN f';
  return registerImageQuery;
};

const createImages = async (pubsub, email, feedId, files) => {
  try {
    const filePromises: Array<Promise<any>> = [];
    for await (const file of files) {
      const { filename, createReadStream } = file;
      filePromises.push(uploadToObjStorage(createReadStream(), filename));
    }
    const fileLocations = await Promise.all(filePromises);
    const REGISTER_IMAGE_QUERY = createImageQuery(fileLocations);

    await requestDB(REGISTER_IMAGE_QUERY, { feedId });
    publishFeed(pubsub, feedId, email);
  } catch (error) {
    throw new ImageUploadError();
  }
};

const mutationResolvers: MutationResolvers = {
  enrollFeed: async (
    _,
    { content, files }: MutationEnrollFeedArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const { email } = req;
    const params = { content, email };
    try {
      const results = await requestDB(WRITING_FEED_QUERY, params);
      const feedId = Number(results[0].get(0).identity);
      const FILE_LIMIT = 30;

      if (files && files.length < FILE_LIMIT) {
        createImages(pubsub, email, feedId, files);
      } else {
        publishFeed(pubsub, feedId, email);
      }

      const registeredAlarmId = await requestDB(ALARM_NEW_FEED, {
        feedId,
        userEmail: email
      });
      const [parsedRegisteredAlarmId] = parseResultRecords(registeredAlarmId);
      if (parsedRegisteredAlarmId) {
        publishFeedAlarm(pubsub, parsedRegisteredAlarmId.alarmId, email);
      }

      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    isAuthenticated(req);
    const useremail = req.email;

    const UPDATE_QUERY = getUpdateLikeQuery(count);
    try {
      await requestDB(UPDATE_QUERY, {
        useremail,
        feedId
      });
      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  writeComment: async (
    _,
    { feedId, content }: MutationWriteCommentArgs,
    { req, pubsub }
  ): Promise<boolean> => {
    isAuthenticated(req);
    const userEmail = req.email;

    try {
      const result = await requestDB(WRITE_COMMENT, {
        userEmail,
        feedId,
        content
      });
      const [parsedResult] = parseResultRecords(result);

      const registeredAlarmId = await requestDB(ALARM_NEW_COMMENT, {
        feedId: Number(parsedResult.ID),
        userEmail
      });
      const [parsedRegisteredAlarmId] = parseResultRecords(registeredAlarmId);
      if (parsedRegisteredAlarmId)
        publishFeedAlarm(pubsub, parsedRegisteredAlarmId.alarmId, userEmail);

      return true;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
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
