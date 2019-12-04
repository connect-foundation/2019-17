import jwt from 'jsonwebtoken';
import { IKey } from 'src/schema/commonTypes';
import config from '../utils/config';
const SECRET = config.jwtSecret;

function encodeJWT(target: IKey<string | number>): string {
  return jwt.sign(target, SECRET, {
    expiresIn: '7d',
    issuer: 'BoostBook',
    subject: 'authentication'
  });
}

function decodeJWT(token): any {
  const decodedToken = jwt.verify(token, SECRET);
  return decodedToken;
}

export { encodeJWT, decodeJWT };
