import db from '../db';

async function requestDB(query: string, param?) {
  const session = db.session();
  const res = await session.run(query, param);
  session.close();

  return res.records;
}

export { requestDB };
