import { requestQuery } from "../../utils";
import { CREATE_USER } from "./signup.query";

describe("회원가입 성공 확인", () => {
  test("토큰 제대로 반환 확인", async done => {
    await requestQuery(CREATE_USER);

    done();
  });
});
