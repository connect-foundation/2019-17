import { createError } from 'apollo-errors';

function createDBError(err) {
  return createError('DBError', {
    message: JSON.stringify(err)
  });
}

export default createDBError;
