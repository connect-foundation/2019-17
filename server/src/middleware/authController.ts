import { findUserWithEmail } from '../schema/user/user';
import { decodeJWT, encodeJWT } from '../utils/jwt';

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
      return res.redirect(`${CLIENT_HOST_ADDRESS}/signUp?email=${email}`);
    }

    const token = encodeJWT({ email: user.email });

    res.cookie('token', token);
    res.redirect(CLIENT_HOST_ADDRESS);
  } catch (err) {
    next(err);
  }
};

const checkToken = (req, res, next) => {
  const {
    cookies: { token }
  } = req;
  if (!token) {
    return next();
  }
  try {
    const decoded: any = decodeJWT(token);
    req.email = decoded.email;
  } catch (err) {
    next(err);
  }
  return next();
};

export { signInWithEmail, checkToken };
