import jwt from 'jsonwebtoken';
import { findUserWithEmail } from '../../schema/user/user';
const SECRET: string = process.env.JWT_SECRET || '';

const PRODUCTION: string = 'PRODUCTION';
const NODE_ENV: string = process.env.NODE_ENV || '';
const LOCAL_CLIENT_HOST_ADDRESS: string =
  process.env.LOCAL_CLIENT_HOST_ADDRESS || '';
const PRODUCTION_CLIENT_HOST_ADDRESS: string =
  process.env.PRODUCTION_CLIENT_HOST_ADDRESS || '';
const CLIENT_HOST_ADDRESS: string =
  PRODUCTION === NODE_ENV
    ? PRODUCTION_CLIENT_HOST_ADDRESS
    : LOCAL_CLIENT_HOST_ADDRESS;

const signInWithEmail = async (req, res, next) => {
  try {
    const {
      user: {
        emails: [{ value: email }]
      }
    } = req;
    const user = await findUserWithEmail({ email });
    if (!user) {
      return res.redirect(CLIENT_HOST_ADDRESS + '/signUp');
    }
    jwt.sign(
      { email: user.email },
      SECRET,
      {
        expiresIn: '7d',
        issuer: 'BoostBook',
        subject: 'authentication'
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie('token', token);
        res.redirect('/');
      }
    );
  } catch (err) {
    next(err);
  }
};

const checkToken = (req, res, next) => {
  const {
    cookies: { token }
  } = req;
  if (!token) {
    next();
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      next(err);
    } else {
      req.email = decoded.email;
      next();
    }
  });
};

export { signInWithEmail, checkToken };
