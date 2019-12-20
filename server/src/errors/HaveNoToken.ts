import { createError } from 'apollo-errors';

const HaveNoTokenError = createError('HaveNoToken', {
  message: 'Have no token'
});

export default HaveNoTokenError;
