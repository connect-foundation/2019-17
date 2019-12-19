import { createError } from 'apollo-errors';

const DBError = createError('DBError', {
  message: 'Error in database'
});

export default DBError;
