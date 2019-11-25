export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type File = {
   __typename?: 'File',
  filename: Scalars['String'],
  mimetype: Scalars['String'],
  encoding: Scalars['String'],
};

export type Hello = {
   __typename?: 'Hello',
  text: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  uploadImage: File,
  signUp: User,
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']
};


export type MutationSignUpArgs = {
  nickname: Scalars['String'],
  residence: Scalars['String'],
  hometown: Scalars['String'],
  email: Scalars['String'],
  file?: Maybe<Scalars['Upload']>
};

export type Query = {
   __typename?: 'Query',
  sayHello: Hello,
};


export type QuerySayHelloArgs = {
  name: Scalars['String']
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  nickname: Scalars['String'],
  residence: Scalars['String'],
  hometown: Scalars['String'],
  thumbnail?: Maybe<Scalars['String']>,
};
