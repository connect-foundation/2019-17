import UserIsNotExistError from '../errors/UserIsNotExistError';

const checkReqUserEmail = (req): boolean => {
  if (!req.email) {
    throw new UserIsNotExistError();
  }
  return true;
};

export { checkReqUserEmail };
