import jwt from 'jsonwebtoken';
import { addUser, findUserWithEmail } from '../../schema/user/user';
const SECRET: string = process.env.JWT_SECRET || '';
const CLIENT_SIGNUP_PAGE = process.env.CLIENT_SIGNUP_PAGE || '';

const login = async (req, res, next) => {
  const checkUserWithEmail = async email => {
    const user = await findUserWithEmail({ email });
    if (!user) {
      res.redirect(CLIENT_SIGNUP_PAGE);
      // res.json({});
    } else {
      jwt.sign(
        {
          email: user.email
        },
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
    }
  };

  try {
    checkUserWithEmail(req.user.emails[0].value);
  } catch (err) {
    next(err);
  }
};

const check = (req, res, next) => {
  // console.dir(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'need login'
    });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      next(err);
    } else {
      res.json({
        success: true,
        decoded
      });
    }
  });
};

const signUp = async (req, res, next) => {
  try {
    await addUser(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export { login, check, signUp };
