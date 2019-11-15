import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import passport from './config/passport';

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
    this.app.express.use(passport.initialize());
    this.app.express.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }));
    this.app.express.get('/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
      function(req, res){
        //TODO add response with cookie which have jwt
        res.redirect('http://localhost:3000/');
      });
  };
}

export default new App().app;
