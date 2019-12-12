import { createError } from 'apollo-errors';

const WrongKeywordError = createError('WrongKeywordError', {
  message: 'Wrong Keyword Input'
});

export default WrongKeywordError;
