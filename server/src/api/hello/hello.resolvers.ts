import { Hello, SayHelloQueryArgs } from 'src/types/graph';

export default {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): Hello => {
      return { text: 'waa' };
    }
  }
};
