import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';


class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({ schema });
    this.middlewares();

    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      //TODO check User and add jwt
      console.dir(profile);
    }
  ));
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use('/auth/google',
      passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    this.app.express.use('/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
      function(req, res) {
        //TODO add response with cookie which have jwt
        res.redirect('http://localhost:3000');
      });
  };
}

export default new App().app;
