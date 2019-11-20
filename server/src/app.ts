import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import { checkToken, signInWithEmail } from './config/auth/controller';
import passport from './config/passport';
import schema from './schema';

const PRODUCTION: string = 'PRODUCTION';
const NODE_ENV: string = process.env.NODE_ENV || '';
const LOCAL_CLIENT_HOST_ADDRESS = process.env.LOCAL_CLIENT_HOST_ADDRESS || '';
const PRODUCTION_CLIENT_HOST_ADDRESS: string =
  process.env.PRODUCTION_CLIENT_HOST_ADDRESS || '';
const CLIENT_HOST_ADDRESS: string =
  PRODUCTION === NODE_ENV
    ? PRODUCTION_CLIENT_HOST_ADDRESS
    : LOCAL_CLIENT_HOST_ADDRESS;

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
      signInWithEmail
    );
    this.app.express.get('/', checkToken);
  };
}

export default new App().app;
