import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  description: string;
  access: "PUBLIC" | "PRIVATE";
  likes: number;
  category: { id: string; name: string };
}

interface ICollectionsWithAttempt {
  collection: ICollection;
  quizCount: number;
  isLiked: boolean;
  recentAttempts: number;
  recentCorrectAttempts: number;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

export interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

interface ISearchCollectionsForAuthUser {
  collectionsWithAttempt: ICollectionsWithAttempt[];
  pageInfo: IPageInfo;
}

export interface IData {
  searchCollectionsForAuthUser: ISearchCollectionsForAuthUser;
}

// 컬렉션 검색(로그인 유저용)
export const SEARCH_COLLECTIONS_FOR_AUTH_USER = gql`
  query SearchCollectionsForAuthUser(
    $keywords: [String]
    $offset: Int
    $sort: SortOrder
    $categoryIds: [Int]
    $maxCorrectRate: Int
  ) {
    searchCollectionsForAuthUser(
      keywords: $keywords
      paging: { offset: $offset, pageSize: 8 }
      sort: $sort
      categoryIds: $categoryIds
      maxCorrectRate: $maxCorrectRate
    ) {
      collectionsWithAttempt {
        collection {
          id
          name
          imgUrl
          access
          description
          likes
          category {
            id
            name
          }
        }
        quizCount
        isLiked
        recentAttempts
        recentCorrectAttempts
        totalAttempts
        totalCorrectAttempts
      }
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
    }
  }
`;
