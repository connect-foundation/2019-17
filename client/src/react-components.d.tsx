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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type Feed = {
   __typename?: 'Feed',
  content: Scalars['String'],
  createdAt?: Maybe<Scalars['String']>,
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
  enrollFeed: Scalars['Boolean'],
  uploadImage: File,
  uploadImages: Array<Maybe<File>>,
  signUp: User,
};


export type MutationEnrollFeedArgs = {
  content: Scalars['String'],
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']
};


export type MutationUploadImagesArgs = {
  files: Array<Maybe<Scalars['Upload']>>
};


export type MutationSignUpArgs = {
  nickname: Scalars['String'],
  residence: Scalars['String'],
  hometown: Scalars['String'],
  email: Scalars['String'],
  file?: Maybe<Scalars['Upload']>
};

export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage?: Maybe<Scalars['Boolean']>,
};

export type Query = {
   __typename?: 'Query',
  getFeeds: Array<Maybe<Feed>>,
  feeds: Array<Maybe<Feed>>,
  pageInfo?: Maybe<PageInfo>,
  sayHello: Hello,
};


export type QueryFeedsArgs = {
  first?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['String']>
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

export type EnrollFeedMutationVariables = {
  content: Scalars['String'],
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type EnrollFeedMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'enrollFeed'>
);

export type GetfeedsQueryVariables = {
  first?: Maybe<Scalars['Int']>,
  currentCursor?: Maybe<Scalars['String']>
};


export type GetfeedsQuery = (
  { __typename?: 'Query' }
  & { feeds: Array<Maybe<(
    { __typename?: 'Feed' }
    & Pick<Feed, 'content' | 'createdAt'>
  )>> }
);

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


export const EnrollFeedDocument = gql`
    mutation enrollFeed($content: String!, $files: [Upload]) {
  enrollFeed(content: $content, files: $files)
}
    `;
export type EnrollFeedMutationFn = ApolloReactCommon.MutationFunction<EnrollFeedMutation, EnrollFeedMutationVariables>;
export type EnrollFeedComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EnrollFeedMutation, EnrollFeedMutationVariables>, 'mutation'>;

    export const EnrollFeedComponent = (props: EnrollFeedComponentProps) => (
      <ApolloReactComponents.Mutation<EnrollFeedMutation, EnrollFeedMutationVariables> mutation={EnrollFeedDocument} {...props} />
    );
    
export type EnrollFeedProps<TChildProps = {}> = ApolloReactHoc.MutateProps<EnrollFeedMutation, EnrollFeedMutationVariables> & TChildProps;
export function withEnrollFeed<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EnrollFeedMutation,
  EnrollFeedMutationVariables,
  EnrollFeedProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, EnrollFeedMutation, EnrollFeedMutationVariables, EnrollFeedProps<TChildProps>>(EnrollFeedDocument, {
      alias: 'enrollFeed',
      ...operationOptions
    });
};
export type EnrollFeedMutationResult = ApolloReactCommon.MutationResult<EnrollFeedMutation>;
export type EnrollFeedMutationOptions = ApolloReactCommon.BaseMutationOptions<EnrollFeedMutation, EnrollFeedMutationVariables>;
export const GetfeedsDocument = gql`
    query getfeeds($first: Int, $currentCursor: String) {
  feeds(first: $first, cursor: $currentCursor) {
    content
    createdAt
  }
}
    `;
export type GetfeedsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetfeedsQuery, GetfeedsQueryVariables>, 'query'>;

    export const GetfeedsComponent = (props: GetfeedsComponentProps) => (
      <ApolloReactComponents.Query<GetfeedsQuery, GetfeedsQueryVariables> query={GetfeedsDocument} {...props} />
    );
    
export type GetfeedsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetfeedsQuery, GetfeedsQueryVariables> & TChildProps;
export function withGetfeeds<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetfeedsQuery,
  GetfeedsQueryVariables,
  GetfeedsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetfeedsQuery, GetfeedsQueryVariables, GetfeedsProps<TChildProps>>(GetfeedsDocument, {
      alias: 'getfeeds',
      ...operationOptions
    });
};
export type GetfeedsQueryResult = ApolloReactCommon.QueryResult<GetfeedsQuery, GetfeedsQueryVariables>;
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