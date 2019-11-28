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

export { parseNodeResult };
