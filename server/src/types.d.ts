import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Feed: ResolverTypeWrapper<Feed>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Hello: ResolverTypeWrapper<Hello>,
  Mutation: ResolverTypeWrapper<{}>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  File: ResolverTypeWrapper<File>,
  User: ResolverTypeWrapper<User>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Feed: Feed,
  String: Scalars['String'],
  Int: Scalars['Int'],
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  Hello: Hello,
  Mutation: {},
  Upload: Scalars['Upload'],
  File: File,
  User: User,
};

export type FeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type HelloResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hello'] = ResolversParentTypes['Hello']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  enrollFeed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationEnrollFeedArgs, 'content'>>,
  uploadImage?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>,
  uploadImages?: Resolver<Array<Maybe<ResolversTypes['File']>>, ParentType, ContextType, RequireFields<MutationUploadImagesArgs, 'files'>>,
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'nickname' | 'residence' | 'hometown' | 'email'>>,
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getFeeds?: Resolver<Array<Maybe<ResolversTypes['Feed']>>, ParentType, ContextType>,
  feeds?: Resolver<Array<Maybe<ResolversTypes['Feed']>>, ParentType, ContextType, QueryFeedsArgs>,
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>,
  sayHello?: Resolver<ResolversTypes['Hello'], ParentType, ContextType, RequireFields<QuerySayHelloArgs, 'name'>>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  residence?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hometown?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Feed?: FeedResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Hello?: HelloResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
