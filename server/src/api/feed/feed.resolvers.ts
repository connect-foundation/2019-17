import db from '../../db';
import { MATCH_NEW_FEEDS } from '../../schema/feed/query';
import { IKey } from '../../schema/commonTypes';
import {
  QueryFeedsArgs,
  MutationEnrollFeedArgs,
  MutationResolvers
} from 'src/types';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

const session = db.session();

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
  const session = db.session();
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
      acc += `CREATE (i${idx}:Image {url: '${Location}'}) CREATE (i${idx})-[:HAS]->(f) `;
      return acc;
    }, matchQuery);
    await session.run(query, { feedId });
  } catch (error) {
    console.log(error);
    return;
  } finally {
    session.close();
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
    const session = db.session();
    try {
      const result = await session.run(
        `MATCH (u:User)
         WHERE u.email = $email
        CREATE (f:Feed {content: $content, createdAt: datetime()}) 
        CREATE (u)-[r:AUTHOR]->(f)
        RETURN f`,
        { content, email }
      );
      const feedId = Number(result.records[0].get(0).identity);
      if (files && files.length) {
        createImages(feedId, files);
      }
      return true;
    } catch (error) {
      return false;
    } finally {
      session.close();
    }
  }
};

export default {
  Query: {
    feeds: async (_, { first, cursor = DEFAUT_MAX_DATE }: QueryFeedsArgs) => {
      const result = await session.run(MATCH_NEW_FEEDS, { cursor, first });
      const parsedResult = parseResult(result.records);
      return parsedResult;
    }
  },
  Mutation: mutationResolvers
};
