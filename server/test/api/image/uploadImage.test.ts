import { UPLOAD_IMAGE } from "./image.query";
import path from "path";
import { imageScheme } from "./image.schema";
import { requestQueryWithFile } from "../../utils";

describe("이미지 하나 업로드 확인", () => {
  test("이미지가 제대로 저장되는지 확인", async done => {
    const res = await requestQueryWithFile(UPLOAD_IMAGE, {
      file: path.join(__dirname, "../../asset/", "tmp.png")
    });

    const { error } = imageScheme.validate(res.body.data.uploadImage);
    if (error) throw error;
    done();
  });
});
