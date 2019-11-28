import { QuerySayHelloArgs, Hello } from '../../types';

export default {
  Query: {
    sayHello: (_, args: QuerySayHelloArgs): Hello => {
      return { text: 'waa' };
    }
  }
};
