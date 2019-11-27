import db from '../db';
import createDBError from '../errors/createDBError';

async function requestDB(query: string, param?) {
  let res;
  try {
    const session = db.session();
    res = await session.run(query, param);
    session.close();
  } catch (err) {
    const DBError = createDBError(err);
    throw new DBError();
  }

  return res.records;
}

export { requestDB };
