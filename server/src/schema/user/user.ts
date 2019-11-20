import db from '../../db';
import { addUserQuery, findUserWithEmailQuery } from './query';
import { AddUserQueryArgs, FindUserWithEmailQueryArgs, User } from './types';

export const findUserWithEmail = async (
  args: FindUserWithEmailQueryArgs
): Promise<User> => {
  let result;
  await new Promise(resolve => {
    const session = db.session();
    session
      .run(findUserWithEmailQuery, {
        email: args.email
      })
      .subscribe({
        onNext(record) {
          result = record.get(0).properties;
        },
        onCompleted() {
          session.close();
          resolve();
        },
        onError(error) {
          console.log(error);
        }
      });
  });
  return result;
};

export const addUser = async (args: AddUserQueryArgs): Promise<User> => {
  let result;
  await new Promise(resolve => {
    const session = db.session();
    session
      .run(addUserQuery, {
        email: args.email,
        nickname: args.nickname,
        hometown: args.hometown,
        residence: args.residence,
        thumbnail: args.thumbnail
      })
      .subscribe({
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
