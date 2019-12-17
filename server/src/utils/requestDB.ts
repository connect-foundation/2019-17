import db from '../db';
import createDBError from '../errors/createDBError';
import { FIND_USER_WITH_EMAIL_QUERY } from '../schema/user/query';

async function requestDB(query: string, param?) {
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
}

async function getUserInfoByEmail(email: string) {
  const user = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
  return user[0].get(0).properties;
}

export { requestDB, getUserInfoByEmail };
