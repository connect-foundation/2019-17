import { requestQuery } from "../../utils";
import { USER_CHECK } from "./sample.query";
import { testsScheme } from "./sample.schema";

describe("[테스트 하려는 기능 명세] ex)로그인 성공 확인 ", () => {
  test("[1개의 상세 테스트에 대한 명세] ex)사용자 정보가 1개 이상 존재하는지 확인", async done => {
    const body = await requestQuery(USER_CHECK);
    console.log(body);
    const result = body.data.sayHello;
    const { error } = testsScheme.validate(result);
    if (error) {
      throw error;
    }

    done();
  });
});
