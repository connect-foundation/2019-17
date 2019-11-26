import db from '../../db';
import { MATCH_NEW_FEEDS } from '../../schema/feed/query';
const session = db.session();

interface IPageParam {
  first: number;
  after: number;
  cursor: string;
}
export interface IKey<T> {
  [key: string]: T;
}

const parseResult = result => {
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

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

export default {
  Query: {
    feeds: async (_, { first, cursor = DEFAUT_MAX_DATE }: IPageParam) => {
      const result = await session.run(MATCH_NEW_FEEDS, { cursor, first });
      console.log('-------cursor!!', cursor);

      console.log('result.records', result.records);
      const parsedResult = parseResult(result.records);
      return parsedResult;
    }
  }
};
