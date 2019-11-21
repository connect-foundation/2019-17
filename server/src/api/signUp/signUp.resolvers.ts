import db from '../../db';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { SignUpMutationArgs, User } from '../../types/graph';

const session = db.session();

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
    signUp: async (_, args: SignUpMutationArgs): Promise<User> => {
      const thumbnail = await getUrlWhenFileExists(args);
      const result = await session.run(
        `CREATE (a:User {nickname: $nickname, hometown: $hometown, residence: $residence, email: $email ${
          thumbnail ? ', thumbnail:$thumbnail' : ''
        }
          }) RETURN a`,
        { ...args, thumbnail }
      );

      session.close();

      const node = result.records[0].get(0);

      return node.properties;
    }
  }
};
