import cookieParser from 'cookie-parser';
import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import { signInWithEmail, checkToken } from './middleware/authController';
import passport from './middleware/passport';
import schema from './schema';
import { decodeJWT } from './utils/jwt';
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
    this.app = new GraphQLServer({
      schema,
      context: ({ response, request }) => ({ res: response, req: request })
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000'
      })
    );
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(cookieParser());
    this.app.express.use(passport.initialize());
    this.app.express.use(checkToken);
    this.app.express.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['email', 'profile'] })
    );
    this.app.express.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: CLIENT_HOST_ADDRESS
      }),
      signInWithEmail
    );
    // 쿠키에서 토큰 있는지 확인하고
    // 이메일을 request객체에 넣는다
    this.app.express.use((req, res, next) => {
      console.log('token!!!', req.cookies);
      if (req.cookies.token) {
        const token = req.cookies.token;
        const email = decodeJWT(token);
        console.log('token!!!', email);
        req['user'] = email;
      }
      return next();
    });
  };
}

export default new App().app;
