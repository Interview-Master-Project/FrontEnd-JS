export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/**  Enums */
export enum Access {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/**  Collection type */
export type Collection = {
  __typename?: 'Collection';
  access?: Maybe<Access>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quizzes?: Maybe<Array<Maybe<Quiz>>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CollectionPage = {
  __typename?: 'CollectionPage';
  collections: Array<Collection>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CollectionWithAttempt = RecentAttempt & TotalAttempt & {
  __typename?: 'CollectionWithAttempt';
  collection?: Maybe<Collection>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  quizCount?: Maybe<Scalars['Int']['output']>;
  recentAttempts?: Maybe<Scalars['Int']['output']>;
  recentCorrectAttempts?: Maybe<Scalars['Int']['output']>;
  totalAttempts?: Maybe<Scalars['Int']['output']>;
  totalCorrectAttempts?: Maybe<Scalars['Int']['output']>;
};

export type CollectionWithAttemptsPaging = {
  __typename?: 'CollectionWithAttemptsPaging';
  collectionsWithAttempt: Array<CollectionWithAttempt>;
  pageInfo: PageInfo;
};

export type CollectionWithLike = {
  __typename?: 'CollectionWithLike';
  collection?: Maybe<Collection>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateQuizInput = {
  answer: Scalars['String']['input'];
  collectionId: Scalars['Int']['input'];
  question: Scalars['String']['input'];
};

export type DataPage = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type EditQuizInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 퀴즈 생성하기 */
  createQuiz: Quiz;
  /** 컬렉션 삭제하기 */
  deleteCollection?: Maybe<Scalars['String']['output']>;
  /** 퀴즈 삭제하기 */
  deleteQuiz?: Maybe<Scalars['String']['output']>;
  /** 최신 시도 기록 삭제하기 */
  deleteRecentAttempt?: Maybe<Scalars['String']['output']>;
  /** 유저 탈퇴 */
  deleteUser?: Maybe<Scalars['String']['output']>;
  /** 퀴즈 수정하기 */
  editQuiz: Quiz;
  /** 컬렉션 풀기 끝내기 */
  finishSolveCollection: UserCollectionAttempt;
  /** 컬렉션 좋아요 누르기 */
  like?: Maybe<Scalars['String']['output']>;
  /** 퀴즈 푼 기록들 저장하기 */
  solveQuizzes?: Maybe<Scalars['String']['output']>;
  /** 컬렉션 풀기 시작하기 */
  startSolveCollection: UserCollectionAttempt;
  /** 좋아요 취소 */
  unlike?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateQuizArgs = {
  createQuizInput: CreateQuizInput;
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationDeleteQuizArgs = {
  quizId: Scalars['ID']['input'];
};


export type MutationDeleteRecentAttemptArgs = {
  userCollectionAttemptId: Scalars['ID']['input'];
};


export type MutationEditQuizArgs = {
  editQuizInput: EditQuizInput;
  quizId: Scalars['ID']['input'];
};


export type MutationFinishSolveCollectionArgs = {
  userCollectionAttemptId: Scalars['ID']['input'];
};


export type MutationLikeArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationSolveQuizzesArgs = {
  quizResults: Array<QuizResultInput>;
  userCollectionAttemptId: Scalars['ID']['input'];
};


export type MutationStartSolveCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationUnlikeArgs = {
  collectionId: Scalars['ID']['input'];
};

export enum OAuthProvider {
  Kakao = 'KAKAO',
  Naver = 'NAVER'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
};

/**  Root Query type */
export type Query = {
  __typename?: 'Query';
  /** 모든 카테고리 목록(로그인 필요 없음) */
  getAllCategories: Array<Category>;
  /** 컬렉션 조회 */
  getCollection?: Maybe<Collection>;
  /** 컬렉션에 대한 가장 최신 시도 기록 가져오기 -> 이어서 풀기 여부 확인하기 위해서 */
  getLatestCollectionAttempt: UserCollectionAttempt;
  /** 최근 퀴즈 시도 기록 가져오기 (이어서 풀기로 결정했을 때 사용) */
  getLatestQuizzesAttempt: Array<UserQuizAttempt>;
  /** 퀴즈 잔디밭 정보 */
  getQuizGarden: Array<Maybe<QuizGarden>>;
  /** 컬렉션에 속한 퀴즈들과 유저의 퀴즈 시도 정보 (퀴즈 id순으로 오름차순 정렬) */
  getQuizzesWithAttemptByCollectionId: Array<QuizWithAttempt>;
  /** 로그인 유저의 퀴즈에 대한 시도들 */
  getUserQuizAttempts: Array<UserQuizAttempt>;
  /** 유저가 컬렉션 좋아요 눌렀는지 */
  isLiked: Scalars['Boolean']['output'];
  /** 로그인한 유저의 정보 */
  me?: Maybe<User>;
  /** 유저의 컬렉션 목록 */
  myCollections?: Maybe<CollectionWithAttemptsPaging>;
  /** 히스토리 : filter 조건 없으면 PUBLIC, PRIVATE 둘 다 */
  myHistory?: Maybe<CollectionWithAttemptsPaging>;
  /** 컬렉션 검색 (로그인한 유저 전용) */
  searchCollectionsForAuthUser?: Maybe<CollectionWithAttemptsPaging>;
  /** 컬렉션 검색 (비로그인 유저 전용) */
  searchCollectionsForGuest?: Maybe<CollectionWithAttemptsPaging>;
  /** 퀴즈 검색(로그인 전용) */
  searchQuizzes?: Maybe<QuizzesWithAttemptPaging>;
};


/**  Root Query type */
export type QueryGetCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryGetLatestCollectionAttemptArgs = {
  collectionId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryGetLatestQuizzesAttemptArgs = {
  userCollectionAttemptId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryGetQuizGardenArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


/**  Root Query type */
export type QueryGetQuizzesWithAttemptByCollectionIdArgs = {
  collectionId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryGetUserQuizAttemptsArgs = {
  quizId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryIsLikedArgs = {
  collectionId: Scalars['ID']['input'];
};


/**  Root Query type */
export type QueryMyCollectionsArgs = {
  paging?: InputMaybe<DataPage>;
  sort?: InputMaybe<SortOrder>;
};


/**  Root Query type */
export type QueryMyHistoryArgs = {
  filter?: InputMaybe<Access>;
  paging?: InputMaybe<DataPage>;
};


/**  Root Query type */
export type QuerySearchCollectionsForAuthUserArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxCorrectRate?: InputMaybe<Scalars['Int']['input']>;
  paging?: InputMaybe<DataPage>;
  sort?: InputMaybe<SortOrder>;
};


/**  Root Query type */
export type QuerySearchCollectionsForGuestArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  paging?: InputMaybe<DataPage>;
};


/**  Root Query type */
export type QuerySearchQuizzesArgs = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxCorrectRate?: InputMaybe<Scalars['Int']['input']>;
  paging?: InputMaybe<DataPage>;
  sort?: InputMaybe<SortOrder>;
};

/**  Quiz type */
export type Quiz = {
  __typename?: 'Quiz';
  access?: Maybe<Access>;
  answer?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<Collection>;
  createdAt?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<User>;
  id?: Maybe<Scalars['ID']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type QuizGarden = {
  __typename?: 'QuizGarden';
  date?: Maybe<Scalars['String']['output']>;
  dayIndex?: Maybe<Scalars['Int']['output']>;
  quizzesSolved?: Maybe<Scalars['Int']['output']>;
  weekIndex?: Maybe<Scalars['Int']['output']>;
};

export type QuizResultInput = {
  answeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  correct: Scalars['Boolean']['input'];
  quizId: Scalars['ID']['input'];
};

export type QuizWithAttempt = TotalAttempt & {
  __typename?: 'QuizWithAttempt';
  quiz?: Maybe<Quiz>;
  recentAnswerAt?: Maybe<Scalars['String']['output']>;
  totalAttempts?: Maybe<Scalars['Int']['output']>;
  totalCorrectAttempts?: Maybe<Scalars['Int']['output']>;
};

export type QuizzesWithAttemptPaging = {
  __typename?: 'QuizzesWithAttemptPaging';
  pageInfo: PageInfo;
  quizzesWithAttempt: Array<QuizWithAttempt>;
};

export type RecentAttempt = {
  recentAttempts?: Maybe<Scalars['Int']['output']>;
  recentCorrectAttempts?: Maybe<Scalars['Int']['output']>;
};

/** 정렬 조건 */
export enum SortOrder {
  /** 최신 순 */
  Latest = 'LATEST',
  /** 정답률 낮은 순 */
  LowestAccuracy = 'LOWEST_ACCURACY',
  /** 좋아요 많은 순 */
  MostLiked = 'MOST_LIKED'
}

export type TotalAttempt = {
  totalAttempts?: Maybe<Scalars['Int']['output']>;
  totalCorrectAttempts?: Maybe<Scalars['Int']['output']>;
};

/**  Member type */
export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  oAuthProvider?: Maybe<OAuthProvider>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type UserCollectionAttempt = {
  __typename?: 'UserCollectionAttempt';
  collection?: Maybe<Collection>;
  completedAt?: Maybe<Scalars['String']['output']>;
  correctQuizCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  startedAt?: Maybe<Scalars['String']['output']>;
  totalQuizCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};

export type UserQuizAttempt = {
  __typename?: 'UserQuizAttempt';
  answeredAt: Scalars['String']['output'];
  collectionAttempt: UserCollectionAttempt;
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  quiz: Quiz;
  user: User;
};

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id?: string | null } };

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection?: string | null };

export type DeleteQuizMutationVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type DeleteQuizMutation = { __typename?: 'Mutation', deleteQuiz?: string | null };

export type DeleteRecentAttemptMutationVariables = Exact<{
  userCollectionAttemptId: Scalars['ID']['input'];
}>;


export type DeleteRecentAttemptMutation = { __typename?: 'Mutation', deleteRecentAttempt?: string | null };

export type EditQuizMutationVariables = Exact<{
  input: EditQuizInput;
  quizId: Scalars['ID']['input'];
}>;


export type EditQuizMutation = { __typename?: 'Mutation', editQuiz: { __typename?: 'Quiz', id?: string | null } };

export type FinishSolveCollectionMutationVariables = Exact<{
  userCollectionAttemptId: Scalars['ID']['input'];
}>;


export type FinishSolveCollectionMutation = { __typename?: 'Mutation', finishSolveCollection: { __typename?: 'UserCollectionAttempt', id?: string | null } };

export type LikeMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like?: string | null };

export type SolveQuizzesMutationVariables = Exact<{
  quizResults: Array<QuizResultInput> | QuizResultInput;
  userCollectionAttemptId: Scalars['ID']['input'];
}>;


export type SolveQuizzesMutation = { __typename?: 'Mutation', solveQuizzes?: string | null };

export type StartSolveCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type StartSolveCollectionMutation = { __typename?: 'Mutation', startSolveCollection: { __typename?: 'UserCollectionAttempt', id?: string | null } };

export type UnlikeMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type UnlikeMutation = { __typename?: 'Mutation', unlike?: string | null };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id?: string | null, name?: string | null }> };

export type GetCollectionQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', getCollection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, access?: Access | null, description?: string | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null, quizzes?: Array<{ __typename?: 'Quiz', id?: string | null, access?: Access | null, question?: string | null, updatedAt?: string | null } | null> | null, creator?: { __typename?: 'User', id?: string | null } | null } | null };

export type GetLatestCollectionAttemptQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetLatestCollectionAttemptQuery = { __typename?: 'Query', getLatestCollectionAttempt: { __typename?: 'UserCollectionAttempt', id?: string | null, completedAt?: string | null } };

export type GetLatestQuizzesAttemptQueryVariables = Exact<{
  userCollectionAttemptId: Scalars['ID']['input'];
}>;


export type GetLatestQuizzesAttemptQuery = { __typename?: 'Query', getLatestQuizzesAttempt: Array<{ __typename?: 'UserQuizAttempt', isCorrect: boolean, quiz: { __typename?: 'Quiz', id?: string | null } }> };

export type GetQuizGardenQueryVariables = Exact<{
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
}>;


export type GetQuizGardenQuery = { __typename?: 'Query', getQuizGarden: Array<{ __typename?: 'QuizGarden', date?: string | null, dayIndex?: number | null, quizzesSolved?: number | null, weekIndex?: number | null } | null> };

export type GetQuizzesOnlyIdQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetQuizzesOnlyIdQuery = { __typename?: 'Query', getQuizzesWithAttemptByCollectionId: Array<{ __typename?: 'QuizWithAttempt', quiz?: { __typename?: 'Quiz', id?: string | null } | null }> };

export type GetQuizzesWithAttemptByCollectionIdQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetQuizzesWithAttemptByCollectionIdQuery = { __typename?: 'Query', getQuizzesWithAttemptByCollectionId: Array<{ __typename?: 'QuizWithAttempt', recentAnswerAt?: string | null, totalAttempts?: number | null, totalCorrectAttempts?: number | null, quiz?: { __typename?: 'Quiz', id?: string | null, question?: string | null, answer?: string | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, access?: Access | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null } | null }> };

export type GetQuizBriefQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetQuizBriefQuery = { __typename?: 'Query', getQuizzesWithAttemptByCollectionId: Array<{ __typename?: 'QuizWithAttempt', recentAnswerAt?: string | null, totalAttempts?: number | null, totalCorrectAttempts?: number | null, quiz?: { __typename?: 'Quiz', id?: string | null, question?: string | null, access?: Access | null, updatedAt?: string | null } | null }> };

export type GetQuizHeaderQueryVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type GetQuizHeaderQuery = { __typename?: 'Query', getQuizzesWithAttemptByCollectionId: Array<{ __typename?: 'QuizWithAttempt', quiz?: { __typename?: 'Quiz', id?: string | null, question?: string | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null, nickname?: string | null, imgUrl?: string | null, email?: string | null, oAuthProvider?: OAuthProvider | null } | null };

export type MyCollectionsQueryVariables = Exact<{
  sort?: InputMaybe<SortOrder>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyCollectionsQuery = { __typename?: 'Query', myCollections?: { __typename?: 'CollectionWithAttemptsPaging', collectionsWithAttempt: Array<{ __typename?: 'CollectionWithAttempt', isLiked?: boolean | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, access?: Access | null, imgUrl?: string | null, description?: string | null, likes?: number | null } | null }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, totalPages: number } } | null };

export type MyHistoryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<Access>;
}>;


export type MyHistoryQuery = { __typename?: 'Query', myHistory?: { __typename?: 'CollectionWithAttemptsPaging', collectionsWithAttempt: Array<{ __typename?: 'CollectionWithAttempt', collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, description?: string | null, updatedAt?: string | null, access?: Access | null, likes?: number | null } | null }> } | null };

export type SearchCollectionsForAuthUserQueryVariables = Exact<{
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortOrder>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  maxCorrectRate?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchCollectionsForAuthUserQuery = { __typename?: 'Query', searchCollectionsForAuthUser?: { __typename?: 'CollectionWithAttemptsPaging', collectionsWithAttempt: Array<{ __typename?: 'CollectionWithAttempt', quizCount?: number | null, isLiked?: boolean | null, recentAttempts?: number | null, recentCorrectAttempts?: number | null, totalAttempts?: number | null, totalCorrectAttempts?: number | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, access?: Access | null, description?: string | null, likes?: number | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, totalPages: number } } | null };

export type SearchCollectionsForGuestQueryVariables = Exact<{
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchCollectionsForGuestQuery = { __typename?: 'Query', searchCollectionsForGuest?: { __typename?: 'CollectionWithAttemptsPaging', collectionsWithAttempt: Array<{ __typename?: 'CollectionWithAttempt', quizCount?: number | null, isLiked?: boolean | null, recentAttempts?: number | null, recentCorrectAttempts?: number | null, totalAttempts?: number | null, totalCorrectAttempts?: number | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, access?: Access | null, description?: string | null, likes?: number | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, totalPages: number } } | null };

export type SearchQuizzesQueryVariables = Exact<{
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortOrder>;
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  maxCorrectRate?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchQuizzesQuery = { __typename?: 'Query', searchQuizzes?: { __typename?: 'QuizzesWithAttemptPaging', quizzesWithAttempt: Array<{ __typename?: 'QuizWithAttempt', recentAnswerAt?: string | null, totalAttempts?: number | null, totalCorrectAttempts?: number | null, quiz?: { __typename?: 'Quiz', id?: string | null, question?: string | null, collection?: { __typename?: 'Collection', id?: string | null, name?: string | null, imgUrl?: string | null, access?: Access | null, category?: { __typename?: 'Category', id?: string | null, name?: string | null } | null } | null } | null }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, totalPages: number } } | null };
