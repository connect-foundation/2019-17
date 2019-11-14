import { requestQuery } from "../../utils";
import { CREATE_USER } from "./signup.query";
import db from "../../../src/db";
import { userScheme } from "./signup.schema";

let userNum = 0;

afterAll(async () => {
  const session = db.session();
  await session.run(
    `MATCH (n:Person) WHERE n.nickname=~ 'testUser.*' DELETE n`
  );
  session.close();
});

describe("회원가입 성공 확인", () => {
  test("서버 응답 결과가 적절한지 확인", async done => {
    const body = await requestQuery(CREATE_USER(userNum++));

    const { error } = userScheme.validate(body.data.signup);
    if (error) throw error;
    done();
  });

  test("유저 1명이 db에 입력되는지 확인", async done => {
    const body = await requestQuery(CREATE_USER(userNum++));

    const session = db.session();
    const res = await session.run(
      `MATCH (n: Person) WHERE n.nickname= '${body.data.signup.nickname}' return n`
    );
    session.close();

    if (res.records.length !== 1) fail("user is not created");
    done();
  });
});
