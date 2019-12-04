import { createError } from 'apollo-errors';

const AuthenticatedError = createError('AuthenticatedError', {
  message: 'You need authentication'
});

export default AuthenticatedError;
