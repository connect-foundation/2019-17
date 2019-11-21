import db from '../db';

export async function requestDB(query: string, param?) {
  const session = db.session();
  const res = await session.run(query, param);
  session.close();

  return res.records;
}
