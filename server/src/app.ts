import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import { check, login, signUp } from './config/auth/controller';
import passport from './config/passport';
import schema from './schema';

const CLIENT_HOST_ADDRESS = process.env.CLIENT_HOST_ADDRESS || '';

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({ schema });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(cookieParser());
    this.app.express.use(passport.initialize());
    this.app.express.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );
    this.app.express.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: CLIENT_HOST_ADDRESS
      }),
      login
    );
    this.app.express.post('/signUp', signUp, login);
    this.app.express.get('/', check);
  };
}

export default new App().app;
