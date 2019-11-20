export const typeDefs = ["type Hello {\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Hello!\n  findUserWithEmail(email: String!): User\n  addUser(email: String!, nickname: String, hometown: String, residence: String, thumbnail: String): User\n}\n\ntype User {\n  email: String!\n  nickname: String\n  hometown: String\n  residence: String\n  thumbnail: String\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: Hello;
  findUserWithEmail: User | null;
  addUser: User | null;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface FindUserWithEmailQueryArgs {
  email: string;
}

export interface AddUserQueryArgs {
  email: string;
  nickname: string | null;
  hometown: string | null;
  residence: string | null;
  thumbnail: string | null;
}

export interface Hello {
  text: string;
}

export interface User {
  email: string;
  nickname: string | null;
  hometown: string | null;
  residence: string | null;
  thumbnail: string | null;
}
