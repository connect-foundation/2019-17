import { Options } from 'graphql-yoga';

import config from './utils/config';
import app from './app';
import './db';
import { decodeJWT } from './utils/jwt';

const PORT: string | number = config.port;
const ENDPOINT: string = '/graphql';
const PLAYGROUND: string = '/playground';

const corsOptions = {
  origin: config.clientHost,
  credentials: true
};

const appOptions: Options = {
  port: PORT,
  endpoint: ENDPOINT,
  playground: PLAYGROUND,
  cors: corsOptions,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('connection');
      const token = context.request.headers.cookie
        .split(';')
        .filter(e => e.startsWith('token='))[0]
        .split('token=')[1];
      const { email } = decodeJWT(token);
      // const email = 'vantovan7414@gmail.com';
      return { email };
    }
  }
};

const handleStart = () => {
  console.log(`✅ server on PORT : ${PORT}`);
};

app.start(appOptions, handleStart);
