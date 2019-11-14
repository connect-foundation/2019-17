import { Token, SignupQueryArgs } from "src/types/graph";
import db from "../../db";

const session = db.session();

export default {
  Query: {
    signup: async (_, args: SignupQueryArgs): Promise<Token> => {
      const result = await session.run(
        "CREATE (a:Person {name: $name}) RETURN a",
        { name: "Park" }
      );

      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      console.log(node.properties.name);

      return { token: "www", expireDate: "!!!" };
    }
  }
};
