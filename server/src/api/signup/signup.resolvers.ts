import { User, SignupQueryArgs } from "src/types/graph";
import db from "../../db";

const session = db.session();

export default {
  Query: {
    signup: async (_, args: SignupQueryArgs): Promise<User> => {
      const result = await session.run(
        `CREATE (a:Person {nickname: $nickname, hometown: $hometown, residence: $residence, googleId: $googleId ${
          args.thumbnail ? ", thumbnail:$thumbnail" : ""
        }}) RETURN a`,
        args
      );

      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties;
    }
  }
};
