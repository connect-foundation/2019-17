import db from '../db';
import createDBError from '../errors/createDBError';

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

export { requestDB };
