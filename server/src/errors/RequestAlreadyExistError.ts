import { createError } from 'apollo-errors';

const RequestAlreadyExistError = createError('RequestAlreadyExistError', {
  message: '해당되는 request가 이미 존재하거나, 이미 친구입니다.'
});

export default RequestAlreadyExistError;
