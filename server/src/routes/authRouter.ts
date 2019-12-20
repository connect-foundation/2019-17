import express from 'express';
import passport from '../middleware/passport';
import config from '../utils/config';
import signInByEmail from '../middleware/signInByEmail';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: config.clientHost
  }),
  signInByEmail
);

export default router;
