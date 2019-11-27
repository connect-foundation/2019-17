import { GraphQLUpload } from 'apollo-upload-server';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { SignUpMutationArgs, Token } from '../../types/graph';
import { requestDB } from '../../utils/requestDB';
import { encodeJWT } from '../../utils/jwt';

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

export default {
  Mutation: {
    signUp: async (_, args: SignUpMutationArgs, { res }): Promise<Token> => {
      const thumbnail = await getUrlWhenFileExists(args);
      const result = await requestDB(
        `CREATE (a:User {nickname: $nickname, hometown: $hometown, residence: $residence, email: $email ${
          thumbnail ? ', thumbnail:$thumbnail' : ''
        }
          }) RETURN a`,
        { ...args, thumbnail }
      );

      const node = result[0].get(0);

      const token: string = await encodeJWT({ email: args.email });

      res.cookie('token', token);

      return node.properties;
    }
  },
  Upload: GraphQLUpload
};
