import { decodeJWT } from '../utils/jwt';

function setUserFromJWT(req, res, next) {
  const {
    cookies: { token }
  } = req;

  if (token) {
    const { email } = decodeJWT(token);
    req.email = email;
  }

  return next();
}

export default setUserFromJWT;
