import { createError } from 'apollo-errors';

const UserNotFoundError = createError('UserNotFound', {
  message: 'User not found'
});

export default UserNotFoundError;
