import { decodeJWT } from '../utils/jwt';

function setUserFromJWT(req, res, next) {
  const {
    cookies: { token }
  } = req;

  try {
    if (token) {
      const { email } = decodeJWT(token);
      req.email = email;
    }
  } catch (err) {
    next(err);
  }

  return next();
}

export default setUserFromJWT;
