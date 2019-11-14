import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';   

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done){
    done(null,profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export default passport;