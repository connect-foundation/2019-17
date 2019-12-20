import fs from 'fs';

const env = process.env.NODE_ENV || 'DEVELOPMENT';

const https =
  env === 'PRODUCTION'
    ? {
        cert: fs.readFileSync(process.env.CERT || ''),
        key: fs.readFileSync(process.env.KEY || '')
      }
    : undefined;

export default https;
