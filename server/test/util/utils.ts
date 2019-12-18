import request from 'supertest';
import config from '../../src/utils/config';
import app from '../../src/app';
import db from '../../src/db';

const PORT: string | number = config.port || 5000;

export async function requestQuery(query?: string): Promise<any> {
  const server = app.createHttpServer({ port: PORT });
  let res;
  try {
    res = await request(server)
      .post('/')
      .set('Accept', 'application/json')
      .send({ query });

    res.expect(200).expect('Content-Type', /json/);
  } catch (e) {
    if (res.body.errors) console.error(res.body.errors);
  }
  return res;
}

export async function requestQueryWithToken(
  token: string,
  query?: string
): Promise<any> {
  const server = app.createHttpServer({ port: PORT });
  let res;
  try {
    res = await request(server)
      .post('/')
      .set('Cookie', [`token=${token}`])
      .set('Accept', 'application/json')
      .send({ query });

    res.expect(200).expect('Content-Type', /json/);
  } catch (e) {
    if (res.body.errors) console.error(res.body.errors);
  }
  return res;
}

export async function requestDB(query: string, param?) {
  const session = db.session();
  const res = await session.run(query, param);
  session.close();

  return res.records;
}

export const requestQueryWithFile = (
  query: string,
  variables: { [x: string]: any } = {}
) => {
  const server = app.createHttpServer({ port: 5000 });

  return request(server)
    .post('/')
    .field(`operations`, JSON.stringify({ query }))
    .field(`map`, JSON.stringify({ 0: [`variables.file`] }))
    .attach(`0`, variables.file);
};
