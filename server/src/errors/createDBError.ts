import { createError } from 'apollo-errors';

function createDBError(err) {
  return createError('DBError', {
    message: err
  });
}

export default createDBError;
