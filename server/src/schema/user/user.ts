import db from '../../db';
import { findUserWithEmailQuery } from './query';
import { FindUserWithEmailQueryArgs, User } from './types';

export const findUserWithEmail = async (
  args: FindUserWithEmailQueryArgs
): Promise<User> => {
  let result;
  await new Promise(resolve => {
    const session = db.session();
    const { email } = args;
    session.run(findUserWithEmailQuery, { email }).subscribe({
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
