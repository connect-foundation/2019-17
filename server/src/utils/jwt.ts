import jwt from 'jsonwebtoken';
import { IKey } from 'src/schema/commonTypes';
const SECRET: string = process.env.JWT_SECRET || '';

function encodeJWT(target: IKey<string | number>): string {
  return jwt.sign(target, SECRET, {
    expiresIn: '7d',
    issuer: 'BoostBook',
    subject: 'authentication'
  });
}

function decodeJWT(token): object | string {
  return jwt.verify(token, SECRET);
}

export { encodeJWT, decodeJWT };
