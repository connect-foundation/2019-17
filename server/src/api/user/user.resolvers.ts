import { FindUserWithEmailQueryArgs, User } from 'src/types/graph';
import db from '../../db';
import { findUserWithEmailQuery } from './query';

export default {
  Query: {
    findUserWithEmail: async (
      _,
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
    }
  }
};
