const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const configs = {
  base: {
    path: process.env.NODE_PATH
  }
};

const devConfigs = {
<<<<<<< HEAD
  serverHost: 'http://localhost:4000',
  webSocket: `ws://localhost:4000`
};

const prdConfigs = {
  serverHost: `https://${process.env.REACT_APP_SERVER_HOST}`,
  webSocket: `wss://${process.env.REACT_APP_SERVER_HOST}`
=======
  serverHost: 'localhost:4000'
};

const prdConfigs = {
  serverHost: process.env.REACT_APP_SERVER_HOST || ''
>>>>>>> 6e822b097ba543ab2a61cc53bbd2d4f6e96a6905
};

const config = Object.assign(
  configs.base,
  env === 'production' ? prdConfigs : devConfigs
);

export default config;
