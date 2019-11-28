import { MATCH_NEW_FEEDS } from '../../schema/feed/query';
import { IKey } from '../../schema/commonTypes';
import {
  QueryFeedsArgs,
  MutationEnrollFeedArgs,
  MutationResolvers
} from '../../types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { requestDB } from '../../utils/requestDB';
import { WRITING_FEED_QUERY, createImageNodeAndRelation } from './feed.query';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const parseResult = (
  result: Array<IKey<any>>
): Array<IKey<string | number>> => {
  const returnArr: Array<IKey<string | number>> = [];
  for (const item of result) {
    let i = 0;
    const obj = {};
    for (const key of item.keys) {
      obj[key] = item.get(i);
      i++;
    }

    returnArr.push(obj);
  }
  return returnArr;
};

const createImages = async (feedId, files) => {
  try {
    let filePromises: Promise<any>[] = [];
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
    if (!email) return false;
    const params = { content, email };
    const results = await requestDB(WRITING_FEED_QUERY, params);
    const feedId = Number(results[0].get(0).identity);
    if (files && files.length) {
      createImages(feedId, files);
    }
    return true;
  }
};

export default {
  Query: {
    feeds: async (_, { first, cursor = DEFAUT_MAX_DATE }: QueryFeedsArgs) => {
      const result = await requestDB(MATCH_NEW_FEEDS, { cursor, first });
      const parsedResult = parseResult(result);
      return parsedResult;
    }
  },
  Mutation: mutationResolvers
};
