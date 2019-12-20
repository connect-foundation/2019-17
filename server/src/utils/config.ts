const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'DEVELOPMENT';

const configs = {
  base: {
    port: process.env.PORT || 4000,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    jwtSecret: process.env.JWT_SECRET || '',
    nc: {
      accessKey: process.env.NC_ACCESS_KEY,
      secretKey: process.env.NC_SECRET_KEY,
      bucketName: process.env.NC_BUCKET_NAME
    }
  }
};

const devConfigs = {
  serverHost: process.env.LOCAL_SERVER_HOST_ADDRESS || '',
  clientHost: process.env.LOCAL_CLIENT_HOST_ADDRESS || '',
  db: {
    host: 'bolt://localhost',
    id: 'neo4j',
    password: 'neo4j'
  },
  redis: {
    host: '127.0.0.1'
  }
};

const prdConfigs = {
  serverHost: process.env.PRODUCTION_SERVER_HOST_ADDRESS || '',
  clientHost: process.env.PRODUCTION_CLIENT_HOST_ADDRESS || '',
  db: {
    host: `bolt://${process.env.DB_HOST}` || '',
    id: process.env.NEO4J_ID || '',
    password: process.env.NEO4J_PASSWORD || ''
  },
  redis: {
    host: process.env.DB_HOST
  }
};

const config = Object.assign(
  configs.base,
  env === 'PRODUCTION' ? prdConfigs : devConfigs
);

export default config;
