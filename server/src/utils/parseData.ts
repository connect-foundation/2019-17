import { IKey } from '../schema/commonTypes';
import neo4j from 'neo4j-driver';
import { isString } from 'util';

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

export const datetransform = object => {
  let returnobj = {};

  for (let property in object) {
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
        temp[property] = datetransform(propertyValue);
        returnobj = { ...returnobj, ...temp };
      } else if (toString.call(propertyValue) === '[object Boolean]') {
        returnobj[property] = propertyValue;
      }
    }
  }
  return returnobj;
};

/**
 * 주의사항 : 결과가 여러개이면 result.records 한개이면 result를 record로 받아야 함
 * @param records
 */
export const parseResultRecords = records => {
  let result: any[] = [];
  for (const item of records) {
    let arr: any = {};
    const length = item.length || 0;
    for (let i = 0; i < length; i++) {
      if (toString.call(item) === '[object Object]') {
        let node = item.get(i);
        let nodeKey = item.keys[i];
        if (
          node instanceof neo4j.types.Node ||
          node instanceof neo4j.types.Relationship
        ) {
          let temp = {};
          temp[nodeKey] = datetransform(node.properties);
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
            if (no instanceof neo4j.types.Node) {
              innerTemp = { ...innerTemp, ...datetransform(no.properties) }; // !!
              temp[nodeKey].push(innerTemp);
            } else {
              innerTemp = { ...innerTemp, ...datetransform(no) }; // !!
              temp[nodeKey].push(innerTemp);
            }
          }
          arr = { ...arr, ...temp };
        } else if (isString(node)) {
          //type을 가져올 때
          arr = { ...arr, type: node };
        }
        //else if string , else if  neo4j.types.Record
        else {
          console.log('???????!! : ', node);
        }
      }
    }
    result.push(arr);
  }

  return result;
};

export const getNode = result => result[0].get(0).properties;

export const getFirstKeyValue = result => result[0].get(0);
