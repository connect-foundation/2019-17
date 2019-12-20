import db from '../db';
import DBError from '../errors/DBError';
import { FIND_USER_BY_EMAIL_QUERY } from '../schema/user/query';
import { getNode } from './parseData';

export const requestDB = async (query: string, param?) => {
  let session;
  try {
    session = db.session();
    const res = await session.run(query, param);
    return res.records;
  } catch (error) {
    throw new DBError({
      internalData: error
    });
  } finally {
    session.close();
  }
};

export const getUserInfoByEmail = async (email: string) => {
  const user = await requestDB(FIND_USER_BY_EMAIL_QUERY, { email });
  return getNode(user);
};

export const getUserWithStatus = async (email, status) => {
  const result = await requestDB(FIND_USER_BY_EMAIL_QUERY, {
    email
  });
  const user = getNode(result);
  if (user) user.status = status;
  return user;
};
