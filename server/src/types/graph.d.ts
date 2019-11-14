export const typeDefs = ["type Hello {\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Hello!\n  signup(nickname: String!, residence: String!, hometown: String!, googleId: String!, thumbnail: String): User!\n}\n\ntype User {\n  nickname: String!\n  residence: String!\n  hometown: String!\n  thumbnail: String\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: Hello;
  signup: User;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface SignupQueryArgs {
  nickname: string;
  residence: string;
  hometown: string;
  googleId: string;
  thumbnail: string | null;
}

export interface Hello {
  text: string;
}

export interface User {
  nickname: string;
  residence: string;
  hometown: string;
  thumbnail: string | null;
}
