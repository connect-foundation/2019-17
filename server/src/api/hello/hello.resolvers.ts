import { Hello, QuerySayHelloArgs } from "src/types";

export default {
  Query: {
    sayHello: (_, args: QuerySayHelloArgs): Hello => {
      return { text: "waa" };
    }
  }
};
