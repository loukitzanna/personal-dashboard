import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ForecastDay = {
  condition?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  maxTemp?: Maybe<Scalars['Float']['output']>;
  minTemp?: Maybe<Scalars['Float']['output']>;
};

export type HistoricalData = {
  price?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  stocks?: Maybe<StockData>;
  weather?: Maybe<Weather>;
};


export type QueryStocksArgs = {
  symbol: Scalars['String']['input'];
  timeRange: Scalars['String']['input'];
};


export type QueryWeatherArgs = {
  location: Scalars['String']['input'];
  units: Scalars['String']['input'];
};

export type StockData = {
  change?: Maybe<Scalars['Float']['output']>;
  changePercent?: Maybe<Scalars['Float']['output']>;
  historical?: Maybe<Array<Maybe<HistoricalData>>>;
  marketIsOpen?: Maybe<Scalars['Boolean']['output']>;
  marketSession?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type Weather = {
  condition?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  forecast?: Maybe<Array<Maybe<ForecastDay>>>;
  humidity?: Maybe<Scalars['Int']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  windSpeed?: Maybe<Scalars['Float']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ForecastDay: ResolverTypeWrapper<ForecastDay>;
  HistoricalData: ResolverTypeWrapper<HistoricalData>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  StockData: ResolverTypeWrapper<StockData>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Weather: ResolverTypeWrapper<Weather>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ForecastDay: ForecastDay;
  HistoricalData: HistoricalData;
  Int: Scalars['Int']['output'];
  Query: {};
  StockData: StockData;
  String: Scalars['String']['output'];
  Weather: Weather;
}>;

export type ForecastDayResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ForecastDay'] = ResolversParentTypes['ForecastDay']> = ResolversObject<{
  condition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxTemp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minTemp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoricalDataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['HistoricalData'] = ResolversParentTypes['HistoricalData']> = ResolversObject<{
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  stocks?: Resolver<Maybe<ResolversTypes['StockData']>, ParentType, ContextType, RequireFields<QueryStocksArgs, 'symbol' | 'timeRange'>>;
  weather?: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType, RequireFields<QueryWeatherArgs, 'location' | 'units'>>;
}>;

export type StockDataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StockData'] = ResolversParentTypes['StockData']> = ResolversObject<{
  change?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  changePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  historical?: Resolver<Maybe<Array<Maybe<ResolversTypes['HistoricalData']>>>, ParentType, ContextType>;
  marketIsOpen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  marketSession?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WeatherResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']> = ResolversObject<{
  condition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<Array<Maybe<ResolversTypes['ForecastDay']>>>, ParentType, ContextType>;
  humidity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  temperature?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  ForecastDay?: ForecastDayResolvers<ContextType>;
  HistoricalData?: HistoricalDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StockData?: StockDataResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
}>;

