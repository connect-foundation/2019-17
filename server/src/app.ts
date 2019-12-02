import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import config from './utils/config';
import { signInWithEmail, checkToken } from './middleware/authController';
import passport from './middleware/passport';
import schema from './schema';
import setUserFromJWT from './middleware/setUserFromJWT';

class App {
  public app: GraphQLServer;
  constructor() {
    const pubsub = new PubSub();
    this.app = new GraphQLServer({
      schema,
      context: ({ request, response }) => ({
        req: request,
        res: response,
        pubsub
      })
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(
      cors({ credentials: true, origin: config.clientHost })
    );
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(cookieParser());
    this.app.express.use(passport.initialize());
    this.app.express.use(checkToken);
    this.app.express.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['email'] })
    );
    this.app.express.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: config.clientHost
      }),
      signInWithEmail
    );
    this.app.express.use(setUserFromJWT);
  };
}

export default new App().app;
