import dotenv from "dotenv";
import request from "supertest";
dotenv.config();

import app from "../src/app";
import db from "../src/db";

const PORT: string | number = process.env.PORT || 5000;

interface IRequestResponse {
  errors: any[];
  data: any;
}

async function requestQuery(query?: string): Promise<IRequestResponse> {
  const server = app.createHttpServer({ port: PORT });
  const res = await request(server)
    .post("/")
    .set("Accept", "application/json")
    .send({ query })
    .expect(200)
    .expect("Content-Type", /json/);

  return res.body;
}

async function requestDB(query: string) {
  const session = db.session();
  const res = await session.run(query);
  session.close();

  return res.records;
}

export { requestQuery, requestDB };
