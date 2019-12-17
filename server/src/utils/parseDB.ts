export const getNode = result => {
  return result[0].get(0).properties;
};

export const getFirstKeyValue = result => {
  return result[0].get(0);
};
