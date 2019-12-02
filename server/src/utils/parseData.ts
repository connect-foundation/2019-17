import { IKey } from '../schema/commonTypes';
import neo4j from 'neo4j-driver';

export const parseResult = (
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

export const Datetransform = object => {
  let returnobj = {};
  for (let property in object) {
    // console.log('---property --- ', property); 뮤터블!!
    if (object.hasOwnProperty(property)) {
      const propertyValue = object[property];
      if (neo4j.isInt(propertyValue)) {
        returnobj[property] = String(propertyValue);
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
/**
 * 주의사항 : 결과가 여러개이면 result.records 한개이면 result를 record로 받아야 함
 * @param records
 */
export const ParseResultRecords = records => {
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
          temp[nodeKey] = String(node);
          arr = { ...arr, ...temp };
        } else if (toString.call(node) === '[object Array]') {
          let temp: { [key: string]: any } = {};
          temp[nodeKey] = [];
          for (const no of node) {
            let innerTemp = {};
            innerTemp = { ...innerTemp, ...Datetransform(no.properties) }; // !!
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
  // console.log('결과!!! ', JSON.stringify(result, null, 2));

  return result;
};
