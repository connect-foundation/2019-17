import { createError } from 'apollo-errors';

const RequestAlreadyExistError = createError('RequestAlreadyExistError', {
  message: '해당되는 request가 이미 존재합니다.'
});

export default RequestAlreadyExistError;
