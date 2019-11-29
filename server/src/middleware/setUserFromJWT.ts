import { decodeJWT } from '../utils/jwt';

function setUserFromJWT(req, res, next) {
  const {
    cookies: { token }
  } = req;

  if (token) {
    const email = decodeJWT(token);
    req['user'] = email;
  }
  // req['user'] = 'vantovan7414@gmail.com';

  return next();
}

export default setUserFromJWT;
