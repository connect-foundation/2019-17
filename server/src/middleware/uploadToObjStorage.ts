import AWS from 'aws-sdk';
import config from '../utils/config';

const endpoint: any = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const accessKey = config.nc.accessKey;
const secretKey = config.nc.secretKey;
const bucketName = config.nc.bucketName;

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
    Bucket: bucketName + '/attachments',
    Key: new Date().getTime() + filename,
    ACL: 'public-read',
    Body: stream
  }).promise();
}

export default uploadToObjStorage;
