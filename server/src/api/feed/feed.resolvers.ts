import db from '../../db';
import { MATCH_FEEDS, UPDATE_LIKE, DELETE_LIKE } from '../../schema/feed/query';
import { parseResultRecords } from '../../utils/parseData';
import {
  MutationEnrollFeedArgs,
  MutationResolvers,
  QueryResolvers
} from '../../types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import { WRITING_FEED_QUERY, createImageNodeAndRelation } from './feed.query';
import { checkReqUserEmail } from '../../utils/context';

const session = db.session();

interface IPageParam {
  first: number;
  after: number;
  cursor: string;
}
// property로 조회할 때

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
    let filePromises: Array<Promise<any>> = [];
    for await (const file of files) {
      const { filename, createReadStream } = file;
      filePromises = [
        ...filePromises,
        uploadToObjStorage(createReadStream(), filename)
      ];
    }
    const fileLocations = await Promise.all(filePromises);
    const matchQuery = `MATCH (f:Feed) WHERE ID(f) = $feedId `;
    const query = fileLocations.reduce((acc, { Location }, idx) => {
      acc += createImageNodeAndRelation(idx, Location);
      return acc;
    }, matchQuery);
    await requestDB(query, { feedId });
  } catch (error) {
    console.error(error);
  }
};

const mutationResolvers: MutationResolvers = {
  enrollFeed: async (
    _,
    { content, files }: MutationEnrollFeedArgs,
    { req }
  ): Promise<boolean> => {
    const { email } = req;
    if (!email) {
      return false;
    }
    const params = { content, email };
    const results = await requestDB(WRITING_FEED_QUERY, params);
    const feedId = Number(results[0].get(0).identity);
    if (files && files.length) {
      createImages(feedId, files);
    }
    return true;
  },
  updateLike: async (_, { feedId, count }, { req }) => {
    let useremail = '';
    if (checkReqUserEmail(req)) {
      useremail = req.email;
    }
    const UPDATE_QUERY = getUpdateLikeQuery(count);
    const result = await session.run(UPDATE_QUERY, {
      useremail,
      feedId
    });

    console.log('result: ', JSON.stringify(result, null, 2));
    return true;
  }
};

const queryResolvers: QueryResolvers = {
  feedItems: async (
    _,
    { first, cursor = DEFAUT_MAX_DATE }: IPageParam,
    { req }
  ) => {
    console.log('---cursor1 ', cursor);
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
