import { createError } from 'apollo-errors';

const UserIsNotExistError = createError('UserIsNotExistError', {
  message: '사용자 정보가 없습니다 다시 로그인해 주세요'
});

export default UserIsNotExistError;
