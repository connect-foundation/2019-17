import DataParsingError from './DataParsingError';
import UserNotFoundError from './UserNotFound';
import createDBError from './createDBError';

const ErrorResolver = error => {
  let Error;
  if (error && error.where) {
    Error = DataParsingError(error.where);
  } else if (error && error.user) {
    Error = UserNotFoundError;
  } else {
    Error = createDBError(error);
  }
  return new Error();
};

export default ErrorResolver;
