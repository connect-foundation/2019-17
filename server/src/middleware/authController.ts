import { findUserWithEmail } from '../schema/user/user';
import { decodeJWT, encodeJWT } from '../utils/jwt';
import config from '../utils/config';

const signInWithEmail = async (req, res, next) => {
  try {
    const {
      user: {
        emails: [{ value: email }]
      }
    } = req;

    const user = await findUserWithEmail({ email });
    if (!user) {
      return res.redirect(`${config.clientHost}/signUp?email=${email}`);
    }

    const token = encodeJWT({ email: user.email });

    res.cookie('token', token);
    res.redirect(config.clientHost);
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
