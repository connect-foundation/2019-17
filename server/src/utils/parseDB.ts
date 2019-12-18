const parseNodeResult = result => {
  const returnArr: any = [];
  for (const item of result) {
    returnArr.push(item.get(0).properties);
  }
  return returnArr;
};

const getNode = result => result[0].get(0).properties;

const getFirstKeyValue = result => result[0].get(0);

export { parseNodeResult, getNode, getFirstKeyValue };
