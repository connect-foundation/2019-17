import db from '../../db';
import { MATCH_NEW_FEEDS } from '../../schema/feed/query';
import { IKey } from '../../schema/commonTypes';
import { QueryFeedsArgs } from 'src/types';

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

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

export default {
  Query: {
    feeds: async (_, { first, cursor = DEFAUT_MAX_DATE }: QueryFeedsArgs) => {
      const result = await session.run(MATCH_NEW_FEEDS, { cursor, first });
      const parsedResult = parseResult(result.records);
      return parsedResult;
    }
  }
};
