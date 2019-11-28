import { GraphQLUpload } from 'apollo-upload-server';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { MutationSignUpArgs, User } from '../../types';
import { requestDB } from '../../utils/requestDB';
import { parseNodeResult } from '../../utils/parseDB';
import { encodeJWT } from '../../utils/jwt';
import SameEmailError from '../../errors/EmailAlreadyExistsError';
import { findUserWithEmailQuery } from '../../schema/user/query';

const checkIsEmailExist = async (email): Promise<void> => {
  const sameUsers = await requestDB(findUserWithEmailQuery, { email });

  if (parseNodeResult(sameUsers).length) throw new SameEmailError();
};

const getFileUrl = async file => {
  const { filename, createReadStream } = await file;

  const res = await uploadToObjStorage(createReadStream(), filename);
  return res.Location;
};

const getUrlWhenFileExists = args => {
  if (args.file) {
    return getFileUrl(args.file);
  }
  return null;
};

const createUser = async info => {
  const result = await requestDB(
    `CREATE (u:User {nickname: $nickname, hometown: $hometown, residence: $residence, email: $email ${
      info.thumbnail ? ', thumbnail: $thumbnail' : ''
    }
      }) RETURN u`,
    info
  );
  return result[0].get(0).properties;
};

export default {
  Mutation: {
    signUp: async (_, args: MutationSignUpArgs, { res }): Promise<User> => {
      await checkIsEmailExist(args.email);
      const thumbnail = await getUrlWhenFileExists(args);
      const user = await createUser({ ...args, thumbnail });
      const token: string = encodeJWT({ email: args.email });
      res.cookie('token', token);
      return user;
    }
  },
  Upload: GraphQLUpload
};
