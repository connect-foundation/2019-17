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
  PageInfo: ResolverTypeWrapper<PageInfo>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  IFeeds: ResolverTypeWrapper<IFeeds>,
  IFeed: ResolverTypeWrapper<IFeed>,
  IUser: ResolverTypeWrapper<IUser>,
  Content: ResolverTypeWrapper<Content>,
  Idate: ResolverTypeWrapper<Idate>,
  Image: ResolverTypeWrapper<Image>,
  Comment: ResolverTypeWrapper<Comment>,
  Hello: ResolverTypeWrapper<Hello>,
  UserInfo: ResolverTypeWrapper<UserInfo>,
  User: ResolverTypeWrapper<User>,
  Mutation: ResolverTypeWrapper<{}>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  File: ResolverTypeWrapper<File>,
  Subscription: ResolverTypeWrapper<{}>,
  ISubsFeeds: ResolverTypeWrapper<ISubsFeeds>,
  tempFeed: ResolverTypeWrapper<TempFeed>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  PageInfo: PageInfo,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Int: Scalars['Int'],
  IFeeds: IFeeds,
  IFeed: IFeed,
  IUser: IUser,
  Content: Content,
  Idate: Idate,
  Image: Image,
  Comment: Comment,
  Hello: Hello,
  UserInfo: UserInfo,
  User: User,
  Mutation: {},
  Upload: Scalars['Upload'],
  File: File,
  Subscription: {},
  ISubsFeeds: ISubsFeeds,
  tempFeed: TempFeed,
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Idate']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type HelloResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hello'] = ResolversParentTypes['Hello']> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type IdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Idate'] = ResolversParentTypes['Idate']> = {
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  month?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nanosecond?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timeZoneOffsetSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  timeZoneId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type IFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['IFeed'] = ResolversParentTypes['IFeed']> = {
  searchUser?: Resolver<Maybe<ResolversTypes['IUser']>, ParentType, ContextType>,
  feed?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>,
  feedId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  totallikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  imglist?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>,
  hasLiked?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
};

export type IFeedsResolvers<ContextType = any, ParentType extends ResolversParentTypes['IFeeds'] = ResolversParentTypes['IFeeds']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  feedItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['IFeed']>>>, ParentType, ContextType>,
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ISubsFeedsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ISubsFeeds'] = ResolversParentTypes['ISubsFeeds']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  feedItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['IFeed']>>>, ParentType, ContextType>,
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hometown?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  residence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateLike?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationUpdateLikeArgs>,
  enrollFeed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationEnrollFeedArgs, 'content'>>,
  requestFriend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRequestFriendArgs, 'targetEmail' | 'relation'>>,
  uploadImage?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>,
  uploadImages?: Resolver<Array<Maybe<ResolversTypes['File']>>, ParentType, ContextType, RequireFields<MutationUploadImagesArgs, 'files'>>,
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'nickname' | 'residence' | 'hometown' | 'email'>>,
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>,
  feeds?: Resolver<Maybe<ResolversTypes['IFeeds']>, ParentType, ContextType, QueryFeedsArgs>,
  sayHello?: Resolver<ResolversTypes['Hello'], ParentType, ContextType, RequireFields<QuerySayHelloArgs, 'name'>>,
  searchUser?: Resolver<Array<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<QuerySearchUserArgs, 'keyword'>>,
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  feeds?: SubscriptionResolver<Maybe<ResolversTypes['ISubsFeeds']>, "feeds", ParentType, ContextType, SubscriptionFeedsArgs>,
};

export type TempFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['tempFeed'] = ResolversParentTypes['tempFeed']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Idate']>, ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
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

export type UserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInfo'] = ResolversParentTypes['UserInfo']> = {
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  relation?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>,
  Content?: ContentResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Hello?: HelloResolvers<ContextType>,
  Idate?: IdateResolvers<ContextType>,
  IFeed?: IFeedResolvers<ContextType>,
  IFeeds?: IFeedsResolvers<ContextType>,
  Image?: ImageResolvers<ContextType>,
  ISubsFeeds?: ISubsFeedsResolvers<ContextType>,
  IUser?: IUserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  tempFeed?: TempFeedResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  UserInfo?: UserInfoResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
