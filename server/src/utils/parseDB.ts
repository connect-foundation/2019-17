interface IKey<T> {
  [key: string]: T;
}

const parseNodesResult = result => {
  const returnArr: Array<IKey<string | number>> = [];
  for (const item of result) {
    let obj = {};
    for (const it of item) {
      obj = { ...obj, ...it.properties };
    }
    returnArr.push(obj);
  }
  return returnArr;
};

export { parseNodesResult };
