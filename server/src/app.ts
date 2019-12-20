import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import pubsub from './utils/pubsub';
import helmet from 'helmet';
import logger from 'morgan';
import config from './utils/config';
import router from './routes/router';
import setUserFromJWT from './middleware/setUserFromJWT';
import passport from './middleware/passport';
import schema from './schema';

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: ({ request, response, connection }) => ({
        req: request,
        res: response,
        email: connection ? connection.context.email : undefined,
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
    this.app.express.use(setUserFromJWT);
    this.app.express.use(router);
  };
}

export default new App().app;
