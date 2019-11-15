import { requestQuery, requestDB } from "../../utils";
import { CREATE_USER } from "./signUp.query";
import { userScheme } from "./signUp.schema";

let userNum = 0;

afterAll(async () => {
  await requestDB(`MATCH (n:Person) WHERE n.nickname=~ 'testUser.*' DELETE n`);
});

describe("회원가입 성공 확인", () => {
  test("서버 응답 결과가 적절한지 확인", async done => {
    const body = await requestQuery(CREATE_USER(userNum++));

    const { error } = userScheme.validate(body.data.signUp);
    if (error) throw error;
    done();
  });

  test("유저 1명이 db에 입력되는지 확인", async done => {
    const body = await requestQuery(CREATE_USER(userNum++));

    const res = await requestDB(
      `MATCH (n: Person) WHERE n.nickname= '${body.data.signUp.nickname}' return n`
    );

    if (res.length !== 1) fail("user is not created");
    done();
  });
});
