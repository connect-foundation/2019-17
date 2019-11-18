import AWS from "aws-sdk";
import { ReadStream } from "fs";
// import fs, { ReadStream } from "fs";
// import sharp from "sharp";

const endpoint: any = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const access_key = process.env.NC_ACCESS_KEY;
const secret_key = process.env.NC_SECRET_KEY;

export default {
  Mutation: {
    uploadImage: async (_, { file }) => {
      const { filename, mimetype, encoding, createReadStream } = await file;

      // const local_file_path = "./test.png";

      // const stream: ReadStream = createReadStream();
      // await new Promise(resolve =>
      //   stream
      //     .pipe(fs.createWriteStream(local_file_path))
      //     .on("finish", () => resolve())
      // );

      AWS.config.update({
        accessKeyId: access_key,
        secretAccessKey: secret_key
      });

      const S3 = new AWS.S3({
        endpoint,
        region
      });

      const bucket_name = "boostbook";

      const object_name = "test-origin";
      const stream: ReadStream = createReadStream();

      await S3.upload({
        Bucket: bucket_name + "/attachments",
        Key: object_name,
        ACL: "public-read",
        Body: stream
      }).promise();

      const returnFile = { filename, mimetype, encoding };

      return returnFile;
    }
  }
};
