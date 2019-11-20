export const typeDefs = ["type Hello {\n  text: String!\n}\n\ntype Query {\n  sayHello(name: String!): Hello!\n}\n\nscalar Upload\n\ntype File {\n  filename: String!\n  mimetype: String!\n  encoding: String!\n}\n\ntype Mutation {\n  uploadImage(file: Upload!): File!\n  signUp(nickname: String!, residence: String!, hometown: String!, email: String!, file: Upload): User!\n}\n\ntype User {\n  email: String!\n  nickname: String!\n  residence: String!\n  hometown: String!\n  thumbnail: String\n}\n"];
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

export interface Mutation {
  uploadImage: File;
  signUp: User;
}

export interface UploadImageMutationArgs {
  file: Upload;
}

export interface SignUpMutationArgs {
  nickname: string;
  residence: string;
  hometown: string;
  email: string;
  file: Upload | null;
}

export type Upload = any;

export interface File {
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface User {
  email: string;
  nickname: string;
  residence: string;
  hometown: string;
  thumbnail: string | null;
}
