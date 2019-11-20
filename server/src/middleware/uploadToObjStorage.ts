import AWS from "aws-sdk";

const endpoint: any = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const accessKey = process.env.NC_ACCESS_KEY;
const secretKey = process.env.NC_SECRET_KEY;
const bucketName = process.env.NC_BUCKET_NAME;

function uploadToObjStorage(stream, filename) {
  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  });

  const S3 = new AWS.S3({
    endpoint,
    region
  });

  return S3.upload({
    Bucket: bucketName + "/attachments",
    Key: new Date().getTime() + filename,
    ACL: "public-read",
    Body: stream
  }).promise();
}

export default uploadToObjStorage;
