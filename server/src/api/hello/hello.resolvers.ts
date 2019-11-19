import { Hello, SayHelloQueryArgs } from "../../types/graph";

export default {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): Hello => {
      return { text: "waa" };
    }
  }
};
