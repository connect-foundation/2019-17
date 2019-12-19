import { encodeJWT } from '../utils/jwt';
import config from '../utils/config';
import { getUserInfoByEmail } from '../utils/requestDB';

const signInByEmail = async (req, res, next) => {
  try {
    const {
      user: {
        emails: [{ value: email }]
      }
    } = req;

    const user = await getUserInfoByEmail(email);
    if (!user) {
      return res.redirect(`${config.clientHost}/signUp?email=${email}`);
    }

    const token = encodeJWT({ email: user.email });

    res.cookie('token', token);
    res.redirect(config.clientHost);
  } catch (err) {
    err = err && (err.where || err.name);
    next(err);
  }
};

export default signInByEmail;
