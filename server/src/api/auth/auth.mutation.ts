import { requestDB } from '../../utils/requestDB';
import { encodeJWT } from '../../utils/jwt';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { MutationSignUpArgs, User, MutationResolvers } from 'src/types';
import SameEmailError from '../../errors/EmailAlreadyExistsError';
import { FIND_USER_BY_EMAIL_QUERY } from '../../schema/user/query';
import { parseResultRecords, getNode } from '../../utils/parseDB';

const checkIsEmailExist = async (email): Promise<void> => {
  const sameUsers = await requestDB(FIND_USER_BY_EMAIL_QUERY, { email });

  if (parseResultRecords(sameUsers).length) {
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
  return getNode(result);
};

const mutationResolvers: MutationResolvers = {
  signUp: async (_, args: MutationSignUpArgs, { res }): Promise<User> => {
    await checkIsEmailExist(args.email);
    const thumbnail = await getUrlWhenFileExists(args.file);
    const user = await createUser({ ...args, thumbnail });
    const token: string = encodeJWT({ email: args.email });
    res.cookie('token', token);
    return user;
  }
};

export default mutationResolvers;
