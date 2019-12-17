import db from '../../db';
import { FIND_USER_BY_EMAIL_QUERY } from './query';
import { FindUserWithEmailQueryArgs } from './type';
import { requestDB } from '../../utils/requestDB';
import { getNode } from '../../utils/parseDB';
import { User } from '../../types';

export const findUserWithEmail = async (
  args: FindUserWithEmailQueryArgs
): Promise<User> => {
  let result;
  await new Promise(resolve => {
    const session = db.session();
    const { email } = args;
    session.run(FIND_USER_BY_EMAIL_QUERY, { email }).subscribe({
      onNext(record) {
        result = record.get(0).properties;
      },
      onCompleted() {
        session.close();
        resolve();
      },
      onError(error) {
        throw error;
      }
    });
  });
  return result;
};

export const getUserWithStatus = async (email, status) => {
  const result = await requestDB(FIND_USER_BY_EMAIL_QUERY, {
    email
  });
  const user = getNode(result);
  user.status = status;
  return user;
};
