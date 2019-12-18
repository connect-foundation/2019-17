import { createError } from 'apollo-errors';

const createDBError = err => {
  return createError('DBError', {
    message: JSON.stringify(err)
  });
};

export default createDBError;
