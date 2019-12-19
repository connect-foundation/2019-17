import { createError } from 'apollo-errors';

const DataParsingError = createError('DataParsingError', {
  message: 'Error in data parsing'
});

export default DataParsingError;
