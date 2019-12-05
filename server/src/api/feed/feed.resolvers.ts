import db from '../../db';
import { parseResultRecords } from '../../utils/parseData';
import {
  MATCH_FEEDS,
  UPDATE_LIKE,
  DELETE_LIKE,
  GET_NEW_FEED
} from '../../schema/feed/query';
import {
  MutationEnrollFeedArgs,
  MutationResolvers,
  QueryResolvers,
  IFeed
} from '../../types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import { checkReqUserEmail } from '../../utils/context';
import {
  WRITING_FEED_QUERY,
  createImageNodeAndRelation
} from '../../schema/feed/query';
import isAuthenticated from '../../utils/isAuthenticated';
import createDBError from '../../errors/createDBError';

const session = db.session();

interface IPageParam {
  first: number;
  after: number;
  cursor: string;
}

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const getUpdateLikeQuery = count => {
  if (count > 0) {
    return UPDATE_LIKE;
  } else {
    return DELETE_LIKE;
  }
};

const createImages = async (feedId, files) => {
  try {
    const filePromises: Array<Promise<any>> = [];
    for await (const file of files) {
      const { filename, createReadStream } = file;
      filePromises.push(uploadToObjStorage(createReadStream(), filename));
    }
    const fileLocations = await Promise.all(filePromises);
    const matchQuery = `MATCH (f:Feed) WHERE ID(f) = $feedId `;
    const query = fileLocations.reduce((acc, { Location }, idx) => {
      acc += createImageNodeAndRelation(idx, Location);
      return acc;
    }, matchQuery);
    requestDB(query, { feedId });
  } catch (error) {
    console.error(error);
  }
};

const mutationResolvers: MutationResolvers = {
  enrollFeed: async (
    _,
    { content, files }: MutationEnrollFeedArgs,
    { req }
  ): Promise<IFeed> => {
    isAuthenticated(req);
    const { email } = req;
    const params = { content, email };
    try {
      const results = await requestDB(WRITING_FEED_QUERY, params);
      const feedId = Number(results[0].get(0).identity);
      const FILE_LIMIT = 30;
      if (files && files.length < FILE_LIMIT) {
        createImages(feedId, files);
      }
      const registerdFeed = await requestDB(GET_NEW_FEED, {
        feedId,
        useremail: email
      });
      const parsedRegisterdFeed = parseResultRecords(registerdFeed);
      return parsedRegisterdFeed[0];
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.email;
    }
    const UPDATE_QUERY = getUpdateLikeQuery(count);
    await session.run(UPDATE_QUERY, {
      useremail,
      feedId
    });
    return true;
  }
};

const queryResolvers: QueryResolvers = {
  feedItems: async (
    _,
    { first, cursor = DEFAUT_MAX_DATE }: IPageParam,
    { req }
  ) => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.email;
    }
    const result = await session.run(MATCH_FEEDS, {
      cursor,
      first,
      useremail
    });
    return parseResultRecords(result.records);
  }
};

export default {
  Query: queryResolvers,
  Mutation: mutationResolvers
};
