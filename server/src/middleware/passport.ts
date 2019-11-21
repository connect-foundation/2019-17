import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

const PRODUCTION: string = 'PRODUCTION';
const NODE_ENV: string = process.env.NODE_ENV || '';
const LOCAL_SERVER_HOST_ADDRESS: string =
  process.env.LOCAL_SERVER_HOST_ADDRESS || '';
const PRODUCTION_SERVER_HOST_ADDRESS: string =
  process.env.PRODUCTION_SERVER_HOST_ADDRESS || '';
const SERVER_HOST_ADDRESS: string =
  PRODUCTION === NODE_ENV
    ? PRODUCTION_SERVER_HOST_ADDRESS
    : LOCAL_SERVER_HOST_ADDRESS;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: SERVER_HOST_ADDRESS + '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
