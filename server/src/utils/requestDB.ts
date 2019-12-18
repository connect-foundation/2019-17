import db from '../db';
import createDBError from '../errors/createDBError';
import { FIND_USER_BY_EMAIL_QUERY } from '../schema/user/query';
import { getNode } from './parseDB';

export const requestDB = async (query: string, param?) => {
  let session;
  try {
    session = db.session();
    const res = await session.run(query, param);
    return res.records;
  } catch (err) {
    console.log('err!!! ', err);
    const DBError = createDBError(err);
    throw new DBError();
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
  if (!result) return;
  const user = getNode(result);
  user.status = status;
  return user;
};
