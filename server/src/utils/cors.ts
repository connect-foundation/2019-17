import config from './config';

const cors = {
  origin: config.clientHost,
  credentials: true
};

export default cors;
