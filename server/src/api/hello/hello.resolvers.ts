import { Hello, SayHelloQueryArgs } from "../../types/graph";

export default {
  Query: {
    sayHello: async (_, args: SayHelloQueryArgs): Promise<Hello> => {
      return { text: "waa" };
    }
  }
};
