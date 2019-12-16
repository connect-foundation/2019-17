interface IKey<T> {
  [key: string]: T;
}

const parseNodeResult = result => {
  const returnArr: Array<IKey<string | number>> = [];
  for (const item of result) {
    returnArr.push(item.get(0).properties);
  }
  return returnArr;
};

const getNode = result => {
  return result[0].get(0).properties;
};

const getFirstKeyValue = result => {
  return result[0].get(0);
};

export { parseNodeResult, getNode, getFirstKeyValue };
