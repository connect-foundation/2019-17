import db from '../../db';
import uploadToObjStorage from '../../middleware/uploadToObjStorage';
import { SignUpMutationArgs, User } from '../../types/graph';

const session = db.session();

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

export default {
  Mutation: {
    signUp: async (_, args: SignUpMutationArgs): Promise<User> => {
      const { nickname, residence, hometown, email, file } = args;
      const thumbnail: string | null = await getUrlWhenFileExists(file);
      const result = await session.run(
        `CREATE (a:User {nickname: $nickname, hometown: $hometown, residence: $residence, email: $email ${
          thumbnail ? ', thumbnail: $thumbnail' : ''
        }
          }) RETURN a`,
        { nickname, residence, hometown, email, thumbnail }
      );

      session.close();

      const node = result.records[0].get(0);

      return node.properties;
    }
  }
};
