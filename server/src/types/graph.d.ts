export const typeDefs = ["type Hello {\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Hello!\n  signup(nickname: String!, residence: String!, hometown: String!, thumbnail: String): Token!\n}\n\ntype Token {\n  token: String!\n  expireDate: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: Hello;
  signup: Token;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface SignupQueryArgs {
  nickname: string;
  residence: string;
  hometown: string;
  thumbnail: string | null;
}

export interface Hello {
  text: string;
}

export interface Token {
  token: string;
  expireDate: string;
}
