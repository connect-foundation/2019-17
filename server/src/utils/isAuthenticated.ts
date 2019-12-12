import AuthenticatedError from '../errors/AuthenticatedError';

export default req => {
  if (!req.email) {
    throw new AuthenticatedError();
  }
};
