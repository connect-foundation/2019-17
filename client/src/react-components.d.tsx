import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type SignUpMutationVariables = {
  nickname: Scalars['String'],
  hometown: Scalars['String'],
  residence: Scalars['String'],
  email: Scalars['String'],
  file?: Maybe<Scalars['Upload']>
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'User' }
    & Pick<User, 'email'>
  ) }
);


export const SignUpDocument = gql`
    mutation signUp($nickname: String!, $hometown: String!, $residence: String!, $email: String!, $file: Upload) {
  signUp(nickname: $nickname, hometown: $hometown, residence: $residence, email: $email, file: $file) {
    email
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>, 'mutation'>;

    export const SignUpComponent = (props: SignUpComponentProps) => (
      <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
    );
    
export type SignUpProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SignUpMutation, SignUpMutationVariables> & TChildProps;
export function withSignUp<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignUpMutation,
  SignUpMutationVariables,
  SignUpProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps>>(SignUpDocument, {
      alias: 'signUp',
      ...operationOptions
    });
};
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;