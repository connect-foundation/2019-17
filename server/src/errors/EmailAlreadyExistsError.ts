import { createError } from 'apollo-errors';

const SameEmailError = createError('SameEmailError', {
  message: 'Provided Email Already Exists'
});

export default SameEmailError;
