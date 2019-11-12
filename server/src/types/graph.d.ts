export const typeDefs = ["type Hello {\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Hello!\n}\n"];
/* tslint:disable */

export interface Query {
  sayHello: Hello;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface Hello {
  text: string;
}
