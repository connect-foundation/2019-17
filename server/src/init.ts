import { Options } from 'graphql-yoga';
import config from './utils/config';
import app from './app';
import cors from './utils/cors';
import https from './utils/https';
import { onConnect, onDisconnect } from './middleware/subscription';

const PORT: string | number = config.port;
const ENDPOINT: string = '/graphql';
const PLAYGROUND: string = '/playground';
const SUBSCRIPTIONS: string = '/subscriptions';

const appOptions: Options = {
  port: PORT,
  endpoint: ENDPOINT,
  playground: PLAYGROUND,
  subscriptions: {
    path: SUBSCRIPTIONS,
    onConnect,
    onDisconnect,
    keepAlive: 10000
  },
  cors,
  https
};

const handleStart = () => {
  console.log(`✅ server on PORT : ${PORT}`);
};

app.start(appOptions, handleStart);
