import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import {
  MutationSignUpArgs,
  User,
  MutationResolvers,
  QueryResolvers,
  QueryGetUserArgs
} from '../../types';
import { requestDB } from '../../utils/requestDB';
import { parseNodeResult } from '../../utils/parseDB';
import { encodeJWT } from '../../utils/jwt';
import SameEmailError from '../../errors/EmailAlreadyExistsError';
import { FIND_USER_WITH_EMAIL_QUERY } from '../../schema/user/query';
import isAuthenticated from '../../utils/isAuthenticated';
import { findUserWithEmail } from '../../schema/user/user';
import createDBError from '../../errors/createDBError';
import { parseResultRecords } from '../../utils/parseData';

const checkIsEmailExist = async (email): Promise<void> => {
  const sameUsers = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });

  if (parseNodeResult(sameUsers).length) {
    throw new SameEmailError();
  }
};

const getFileUrl = async file => {
  const { filename, createReadStream } = await file;

  const res = await uploadToObjStorage(createReadStream(), filename);
  return res.Location;
};

const getUrlWhenFileExists = file => {
  if (file) {
    return getFileUrl(file);
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

const Mutation: MutationResolvers = {
  signUp: async (_, args: MutationSignUpArgs, { res }): Promise<User> => {
    await checkIsEmailExist(args.email);
    const thumbnail = await getUrlWhenFileExists(args.file);
    const user = await createUser({ ...args, thumbnail });
    const token: string = encodeJWT({ email: args.email });
    res.cookie('token', token);
    return user;
  }
};

const Query: QueryResolvers = {
  me: async (_, __, { req }): Promise<User> => {
    isAuthenticated(req);
    const { email } = req;
    const user = await findUserWithEmail({ email });
    if (user) {
      return user;
    }
    throw Error('유저 정보를 찾을 수 없습니다.');
  },
  getUser: async (
    _,
    { email }: QueryGetUserArgs,
    { req }
  ): Promise<User | null> => {
    isAuthenticated(req);
    try {
      const result = await requestDB(FIND_USER_WITH_EMAIL_QUERY, { email });
      const [parsedResults] = parseResultRecords(result);
      return parsedResults ? parsedResults.user : null;
    } catch (error) {
      const DBError = createDBError(error);
      throw new DBError();
    }
  }
};

export default {
  Mutation,
  Query
};
