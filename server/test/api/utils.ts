import request from 'supertest';
import config from '../../src/utils/config';
import app from '../../src/app';
import db from '../../src/db';

const PORT: string | number = config.port || 5000;

interface IRequestResponse {
  errors: any[];
  data: any;
}

async function requestQuery(query?: string): Promise<IRequestResponse> {
  const server = app.createHttpServer({ port: PORT });
  const res = await request(server)
    .post('/')
    .set('Accept', 'application/json')
    .send({ query })
    .expect(200)
    .expect('Content-Type', /json/);

  return res.body;
}

async function requestDB(query: string) {
  const session = db.session();
  const res = await session.run(query);
  session.close();

  return res.records;
}

const requestQueryWithFile = (
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

export { requestQuery, requestDB, requestQueryWithFile };
