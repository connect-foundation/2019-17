import { createError } from 'apollo-errors';

const NoRequestError = createError('NoRequestError', {
  message: '해당되는 request가 없어 친구 요청을 받을 수 없습니다.'
});

export default NoRequestError;
