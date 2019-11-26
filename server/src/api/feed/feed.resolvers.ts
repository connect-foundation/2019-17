import db from '../../db';
import { MATCH_NEW_FEEDS, MATCH_FEEDS } from '../../schema/feed/query';
import { IKey } from '../../schema/commonTypes';
import neo4j from 'neo4j-driver';

const session = db.session();

interface IPageParam {
  first: number;
  after: number;
  cursor: string;
}
// property로 조회할 때
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

const Datetransform = object => {
  let returnobj = {};
  for (let property in object) {
    // console.log('---property --- ', property); 뮤터블!!
    if (object.hasOwnProperty(property)) {
      const propertyValue = object[property];
      if (neo4j.isInt(propertyValue)) {
        returnobj[property] = Number(propertyValue);
      } else if (toString.call(propertyValue) === '[object String]') {
        let temp = {};
        temp[property] = propertyValue;
        returnobj = { ...returnobj, ...temp };
      } else if (toString.call(propertyValue) === '[object Object]') {
        let temp = {};
        temp[property] = Datetransform(propertyValue);
        returnobj = { ...returnobj, ...temp };
      }
    }
  }
  return returnobj;
};

const ParseResultRecords = records => {
  let result: any[] = [];
  for (const item of records) {
    let arr: any = {};
    const length = item.length || 0;
    for (let i = 0; i < length; i++) {
      if (toString.call(item) === '[object Object]') {
        let node = item.get(i);
        let nodeKey = item.keys[i];
        if (node instanceof neo4j.types.Node) {
          let temp = {};
          temp[nodeKey] = Datetransform(node.properties);
          arr = { ...arr, ...temp };
        } else if (node instanceof neo4j.types.Integer) {
          const temp = {};
          temp[nodeKey] = Number(node);
          arr = { ...arr, ...temp };
        } else if (toString.call(node) === '[object Array]') {
          let temp: { [key: string]: any } = {};
          temp[nodeKey] = [];
          for (const no of node) {
            let innerTemp = {};
            innerTemp[no.identity] = Datetransform(no.properties);
            temp[nodeKey].push(innerTemp);
          }
          arr = { ...arr, ...temp };
        } //else if string , else if  neo4j.types.Record
        else {
          console.log('???????!! : ', node);
        }
      }
    }
    result.push(arr);
  }
  console.log('결과!!! ', result);
  return result;
};

const DEFAUT_MAX_DATE = '9999-12-31T09:29:26.050Z';

export default {
  Query: {
    feeds: async (_, { first, cursor = DEFAUT_MAX_DATE }: IPageParam) => {
      const result = await session.run(MATCH_NEW_FEEDS, { cursor, first });
      const parsedResult = parseResult(result.records);
      return parsedResult;
    },
    feedItems: async (_, { first, cursor = DEFAUT_MAX_DATE }: IPageParam) => {
      const result = await session.run(MATCH_FEEDS, { cursor, first });
      // console.log(result.records);
      // console.log('INPUT VAL : ', result.records);
      return ParseResultRecords(result.records);
    }
  }
};
