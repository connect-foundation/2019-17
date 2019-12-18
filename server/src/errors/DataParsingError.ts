import { createError } from 'apollo-errors';

const DataParsingError = where =>
  createError('DataParsingError', {
    message: `error occurs in ${where}`
  });

export default DataParsingError;
