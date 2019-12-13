import { Options } from 'graphql-yoga';
import config from './utils/config';
import app from './app';
import './db';
import { decodeJWT } from './utils/jwt';
import { emailWithSocket, socketCountWithEmail } from './utils/socketManager';
import { logoutPublish } from './utils/pubsub';
import { getUserWithStatus } from './schema/user/user';

const PORT: string | number = config.port;
const ENDPOINT: string = '/graphql';
const PLAYGROUND: string = '/playground';
const SUBSCRIPTIONS: string = '/subscriptions';

const corsOptions = {
  origin: config.clientHost,
  credentials: true
};

const appOptions: Options = {
  port: PORT,
  endpoint: ENDPOINT,
  playground: PLAYGROUND,
  subscriptions: {
    path: SUBSCRIPTIONS,
    onConnect: (connectionParams, webSocket, context) => {
      const {
        request: {
          headers: { cookie }
        }
      } = context;
      try {
        if (!cookie || cookie.indexOf('token=') === -1) {
          throw new Error('Have no token');
        }
        const token = cookie
          .split(';')
          .filter(e => e.startsWith('token='))[0]
          .split('token=')[1];
        const { email } = decodeJWT(token);
        emailWithSocket.set(webSocket, email);
        const currentCount = socketCountWithEmail.get(email);
        currentCount
          ? socketCountWithEmail.set(email, currentCount + 1)
          : socketCountWithEmail.set(email, 1);
        return { email };
      } catch (e) {
        return webSocket.close();
      }
    },
    onDisconnect: async (webSocket, context) => {
      const email = emailWithSocket.get(webSocket);
      const currentCount = socketCountWithEmail.get(email);
      if (currentCount === 1) {
        const user = await getUserWithStatus(email, 'offline');
        logoutPublish(user);
        socketCountWithEmail.delete(email);
      } else {
        socketCountWithEmail.set(email, currentCount - 1);
      }
    }
  },
  cors: corsOptions
};

const handleStart = () => {
  console.log(`✅ server on PORT : ${PORT}`);
};

app.start(appOptions, handleStart);
