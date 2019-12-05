import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
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

export type Comment = {
   __typename?: 'Comment',
  id?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type Content = {
   __typename?: 'Content',
  createdAt?: Maybe<Idate>,
  content?: Maybe<Scalars['String']>,
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

export type Idate = {
   __typename?: 'Idate',
  year?: Maybe<Scalars['Int']>,
  month?: Maybe<Scalars['Int']>,
  day?: Maybe<Scalars['Int']>,
  hour?: Maybe<Scalars['Int']>,
  minute?: Maybe<Scalars['Int']>,
  second?: Maybe<Scalars['Int']>,
  nanosecond?: Maybe<Scalars['String']>,
  timeZoneOffsetSeconds?: Maybe<Scalars['Int']>,
  timeZoneId?: Maybe<Scalars['String']>,
};

export type IFeed = {
   __typename?: 'IFeed',
  searchUser?: Maybe<IUser>,
  feed?: Maybe<Content>,
  feedId?: Maybe<Scalars['Int']>,
  totallikes?: Maybe<Scalars['Int']>,
  imglist?: Maybe<Array<Maybe<Image>>>,
  hasLiked?: Maybe<Scalars['Int']>,
  comments?: Maybe<Array<Maybe<Comment>>>,
};

export type IFeeds = {
   __typename?: 'IFeeds',
  cursor?: Maybe<Scalars['String']>,
  feedItems?: Maybe<Array<Maybe<IFeed>>>,
};

export type Image = {
   __typename?: 'Image',
  url?: Maybe<Scalars['String']>,
};

export type ISubsFeeds = {
   __typename?: 'ISubsFeeds',
  cursor?: Maybe<Scalars['String']>,
  feedItems?: Maybe<Array<Maybe<IFeed>>>,
};

export type IUser = {
   __typename?: 'IUser',
  nickname?: Maybe<Scalars['String']>,
  hometown?: Maybe<Scalars['String']>,
  thumbnail?: Maybe<Scalars['String']>,
  residence?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updateLike?: Maybe<Scalars['Boolean']>,
  enrollFeed: Scalars['Boolean'],
  requestFriend: Scalars['Boolean'],
  uploadImage: File,
  uploadImages: Array<Maybe<File>>,
  signUp: User,
};


export type MutationUpdateLikeArgs = {
  feedId?: Maybe<Scalars['Int']>,
  count?: Maybe<Scalars['Int']>
};


export type MutationEnrollFeedArgs = {
  content: Scalars['String'],
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type MutationRequestFriendArgs = {
  targetEmail: Scalars['String'],
  relation: Scalars['String']
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
  pageInfo?: Maybe<PageInfo>,
  feeds?: Maybe<IFeeds>,
  sayHello: Hello,
  searchUser: Array<UserInfo>,
  me: User,
};


export type QueryFeedsArgs = {
  first?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['String']>
};


export type QuerySayHelloArgs = {
  name: Scalars['String']
};


export type QuerySearchUserArgs = {
  keyword: Scalars['String']
};

export type Subscription = {
   __typename?: 'Subscription',
  feeds?: Maybe<ISubsFeeds>,
};


export type SubscriptionFeedsArgs = {
  userEmail?: Maybe<Scalars['String']>
};

export type TempFeed = {
   __typename?: 'tempFeed',
  createdAt?: Maybe<Idate>,
  content: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  nickname: Scalars['String'],
  residence: Scalars['String'],
  hometown: Scalars['String'],
  thumbnail?: Maybe<Scalars['String']>,
};

export type UserInfo = {
   __typename?: 'UserInfo',
  nickname: Scalars['String'],
  thumbnail?: Maybe<Scalars['String']>,
  relation: Scalars['String'],
  email: Scalars['String'],
};

export type UpdateLikeMutationVariables = {
  feedId?: Maybe<Scalars['Int']>,
  count?: Maybe<Scalars['Int']>
};


export type UpdateLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateLike'>
);

export type EnrollFeedMutationVariables = {
  content: Scalars['String'],
  files?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type EnrollFeedMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'enrollFeed'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'thumbnail' | 'email' | 'nickname'>
  ) }
);

export type GetfeedsQueryVariables = {
  first?: Maybe<Scalars['Int']>,
  currentCursor?: Maybe<Scalars['String']>
};


export type GetfeedsQuery = (
  { __typename?: 'Query' }
  & { feeds: Maybe<(
    { __typename?: 'IFeeds' }
    & Pick<IFeeds, 'cursor'>
    & { feedItems: Maybe<Array<Maybe<(
      { __typename?: 'IFeed' }
      & Pick<IFeed, 'feedId' | 'totallikes' | 'hasLiked'>
      & { searchUser: Maybe<(
        { __typename?: 'IUser' }
        & Pick<IUser, 'nickname' | 'hometown' | 'thumbnail' | 'residence' | 'email'>
      )>, feed: Maybe<(
        { __typename?: 'Content' }
        & Pick<Content, 'content'>
        & { createdAt: Maybe<(
          { __typename?: 'Idate' }
          & Pick<Idate, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'nanosecond'>
        )> }
      )>, imglist: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )>>>, comments: Maybe<Array<Maybe<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'content'>
      )>>> }
    )>>> }
  )> }
);

export type SubscribeFeedSubscriptionVariables = {
  userEmail: Scalars['String']
};


export type SubscribeFeedSubscription = (
  { __typename?: 'Subscription' }
  & { feeds: Maybe<(
    { __typename?: 'ISubsFeeds' }
    & Pick<ISubsFeeds, 'cursor'>
    & { feedItems: Maybe<Array<Maybe<(
      { __typename?: 'IFeed' }
      & Pick<IFeed, 'feedId' | 'totallikes' | 'hasLiked'>
      & { searchUser: Maybe<(
        { __typename?: 'IUser' }
        & Pick<IUser, 'nickname' | 'hometown' | 'thumbnail' | 'residence' | 'email'>
      )>, feed: Maybe<(
        { __typename?: 'Content' }
        & Pick<Content, 'content'>
        & { createdAt: Maybe<(
          { __typename?: 'Idate' }
          & Pick<Idate, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'nanosecond'>
        )> }
      )>, imglist: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )>>>, comments: Maybe<Array<Maybe<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'content'>
      )>>> }
    )>>> }
  )> }
);

export type SendRequestMutationVariables = {
  email: Scalars['String'],
  relation: Scalars['String']
};


export type SendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requestFriend'>
);

export type GetUserNameQueryVariables = {
  keyword: Scalars['String']
};


export type GetUserNameQuery = (
  { __typename?: 'Query' }
  & { searchUser: Array<(
    { __typename?: 'UserInfo' }
    & Pick<UserInfo, 'nickname' | 'email' | 'relation' | 'thumbnail'>
  )> }
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


export const UpdateLikeDocument = gql`
    mutation updateLike($feedId: Int, $count: Int) {
  updateLike(feedId: $feedId, count: $count)
}
    `;
export type UpdateLikeMutationFn = ApolloReactCommon.MutationFunction<UpdateLikeMutation, UpdateLikeMutationVariables>;
export type UpdateLikeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateLikeMutation, UpdateLikeMutationVariables>, 'mutation'>;

    export const UpdateLikeComponent = (props: UpdateLikeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateLikeMutation, UpdateLikeMutationVariables> mutation={UpdateLikeDocument} {...props} />
    );
    
export type UpdateLikeProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UpdateLikeMutation, UpdateLikeMutationVariables> & TChildProps;
export function withUpdateLike<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateLikeMutation,
  UpdateLikeMutationVariables,
  UpdateLikeProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateLikeMutation, UpdateLikeMutationVariables, UpdateLikeProps<TChildProps>>(UpdateLikeDocument, {
      alias: 'updateLike',
      ...operationOptions
    });
};

/**
 * __useUpdateLikeMutation__
 *
 * To run a mutation, you first call `useUpdateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLikeMutation, { data, loading, error }] = useUpdateLikeMutation({
 *   variables: {
 *      feedId: // value for 'feedId'
 *      count: // value for 'count'
 *   },
 * });
 */
export function useUpdateLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLikeMutation, UpdateLikeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLikeMutation, UpdateLikeMutationVariables>(UpdateLikeDocument, baseOptions);
      }
export type UpdateLikeMutationHookResult = ReturnType<typeof useUpdateLikeMutation>;
export type UpdateLikeMutationResult = ApolloReactCommon.MutationResult<UpdateLikeMutation>;
export type UpdateLikeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLikeMutation, UpdateLikeMutationVariables>;
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

/**
 * __useEnrollFeedMutation__
 *
 * To run a mutation, you first call `useEnrollFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollFeedMutation, { data, loading, error }] = useEnrollFeedMutation({
 *   variables: {
 *      content: // value for 'content'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useEnrollFeedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EnrollFeedMutation, EnrollFeedMutationVariables>) {
        return ApolloReactHooks.useMutation<EnrollFeedMutation, EnrollFeedMutationVariables>(EnrollFeedDocument, baseOptions);
      }
export type EnrollFeedMutationHookResult = ReturnType<typeof useEnrollFeedMutation>;
export type EnrollFeedMutationResult = ApolloReactCommon.MutationResult<EnrollFeedMutation>;
export type EnrollFeedMutationOptions = ApolloReactCommon.BaseMutationOptions<EnrollFeedMutation, EnrollFeedMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    thumbnail
    email
    nickname
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const GetfeedsDocument = gql`
    query getfeeds($first: Int, $currentCursor: String) {
  feeds(first: $first, cursor: $currentCursor) {
    cursor
    feedItems {
      searchUser {
        nickname
        hometown
        thumbnail
        residence
        email
      }
      feed {
        createdAt {
          year
          month
          day
          hour
          minute
          second
          nanosecond
        }
        content
      }
      feedId
      totallikes
      hasLiked
      imglist {
        url
      }
      comments {
        id
        content
      }
    }
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

/**
 * __useGetfeedsQuery__
 *
 * To run a query within a React component, call `useGetfeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetfeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetfeedsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      currentCursor: // value for 'currentCursor'
 *   },
 * });
 */
export function useGetfeedsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetfeedsQuery, GetfeedsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetfeedsQuery, GetfeedsQueryVariables>(GetfeedsDocument, baseOptions);
      }
export function useGetfeedsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetfeedsQuery, GetfeedsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetfeedsQuery, GetfeedsQueryVariables>(GetfeedsDocument, baseOptions);
        }
export type GetfeedsQueryHookResult = ReturnType<typeof useGetfeedsQuery>;
export type GetfeedsLazyQueryHookResult = ReturnType<typeof useGetfeedsLazyQuery>;
export type GetfeedsQueryResult = ApolloReactCommon.QueryResult<GetfeedsQuery, GetfeedsQueryVariables>;
export const SubscribeFeedDocument = gql`
    subscription subscribeFeed($userEmail: String!) {
  feeds(userEmail: $userEmail) {
    cursor
    feedItems {
      searchUser {
        nickname
        hometown
        thumbnail
        residence
        email
      }
      feed {
        createdAt {
          year
          month
          day
          hour
          minute
          second
          nanosecond
        }
        content
      }
      feedId
      totallikes
      hasLiked
      imglist {
        url
      }
      comments {
        id
        content
      }
    }
  }
}
    `;
export type SubscribeFeedComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables>, 'subscription'>;

    export const SubscribeFeedComponent = (props: SubscribeFeedComponentProps) => (
      <ApolloReactComponents.Subscription<SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables> subscription={SubscribeFeedDocument} {...props} />
    );
    
export type SubscribeFeedProps<TChildProps = {}> = ApolloReactHoc.DataProps<SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables> & TChildProps;
export function withSubscribeFeed<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SubscribeFeedSubscription,
  SubscribeFeedSubscriptionVariables,
  SubscribeFeedProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables, SubscribeFeedProps<TChildProps>>(SubscribeFeedDocument, {
      alias: 'subscribeFeed',
      ...operationOptions
    });
};

/**
 * __useSubscribeFeedSubscription__
 *
 * To run a query within a React component, call `useSubscribeFeedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeFeedSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeFeedSubscription({
 *   variables: {
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useSubscribeFeedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubscribeFeedSubscription, SubscribeFeedSubscriptionVariables>(SubscribeFeedDocument, baseOptions);
      }
export type SubscribeFeedSubscriptionHookResult = ReturnType<typeof useSubscribeFeedSubscription>;
export type SubscribeFeedSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeFeedSubscription>;
export const SendRequestDocument = gql`
    mutation sendRequest($email: String!, $relation: String!) {
  requestFriend(targetEmail: $email, relation: $relation)
}
    `;
export type SendRequestMutationFn = ApolloReactCommon.MutationFunction<SendRequestMutation, SendRequestMutationVariables>;
export type SendRequestComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SendRequestMutation, SendRequestMutationVariables>, 'mutation'>;

    export const SendRequestComponent = (props: SendRequestComponentProps) => (
      <ApolloReactComponents.Mutation<SendRequestMutation, SendRequestMutationVariables> mutation={SendRequestDocument} {...props} />
    );
    
export type SendRequestProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SendRequestMutation, SendRequestMutationVariables> & TChildProps;
export function withSendRequest<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SendRequestMutation,
  SendRequestMutationVariables,
  SendRequestProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SendRequestMutation, SendRequestMutationVariables, SendRequestProps<TChildProps>>(SendRequestDocument, {
      alias: 'sendRequest',
      ...operationOptions
    });
};

/**
 * __useSendRequestMutation__
 *
 * To run a mutation, you first call `useSendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRequestMutation, { data, loading, error }] = useSendRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *      relation: // value for 'relation'
 *   },
 * });
 */
export function useSendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendRequestMutation, SendRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<SendRequestMutation, SendRequestMutationVariables>(SendRequestDocument, baseOptions);
      }
export type SendRequestMutationHookResult = ReturnType<typeof useSendRequestMutation>;
export type SendRequestMutationResult = ApolloReactCommon.MutationResult<SendRequestMutation>;
export type SendRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<SendRequestMutation, SendRequestMutationVariables>;
export const GetUserNameDocument = gql`
    query getUserName($keyword: String!) {
  searchUser(keyword: $keyword) {
    nickname
    email
    relation
    thumbnail
  }
}
    `;
export type GetUserNameComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserNameQuery, GetUserNameQueryVariables>, 'query'> & ({ variables: GetUserNameQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserNameComponent = (props: GetUserNameComponentProps) => (
      <ApolloReactComponents.Query<GetUserNameQuery, GetUserNameQueryVariables> query={GetUserNameDocument} {...props} />
    );
    
export type GetUserNameProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserNameQuery, GetUserNameQueryVariables> & TChildProps;
export function withGetUserName<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserNameQuery,
  GetUserNameQueryVariables,
  GetUserNameProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserNameQuery, GetUserNameQueryVariables, GetUserNameProps<TChildProps>>(GetUserNameDocument, {
      alias: 'getUserName',
      ...operationOptions
    });
};

/**
 * __useGetUserNameQuery__
 *
 * To run a query within a React component, call `useGetUserNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNameQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNameQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useGetUserNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserNameQuery, GetUserNameQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserNameQuery, GetUserNameQueryVariables>(GetUserNameDocument, baseOptions);
      }
export function useGetUserNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserNameQuery, GetUserNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserNameQuery, GetUserNameQueryVariables>(GetUserNameDocument, baseOptions);
        }
export type GetUserNameQueryHookResult = ReturnType<typeof useGetUserNameQuery>;
export type GetUserNameLazyQueryHookResult = ReturnType<typeof useGetUserNameLazyQuery>;
export type GetUserNameQueryResult = ApolloReactCommon.QueryResult<GetUserNameQuery, GetUserNameQueryVariables>;
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

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      hometown: // value for 'hometown'
 *      residence: // value for 'residence'
 *      email: // value for 'email'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;