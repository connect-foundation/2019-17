import UserIsNotExistError from 'src/errors/UserIsNotExistError';

const checkReqUserEmail = (req): boolean => {
  if (!req.user) {
    throw new UserIsNotExistError();
  }
  return true;
};

export { checkReqUserEmail };
