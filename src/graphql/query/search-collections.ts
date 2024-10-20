import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  description: string;
  access: "PUBLIC" | "PRIVATE";
  category: { id: string; name: string };
}

interface ICollectionsWithAttempt {
  collection: ICollection;
  quizCount: number;
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

interface ISearchCollections {
  collectionsWithAttempt: ICollectionsWithAttempt[];
  pageInfo: IPageInfo;
}

export interface IData {
  searchCollections: ISearchCollections;
}

// 컬렉션 검색(최초 렌더링 + 검색 시 모두 사용)
export const SEARCH_COLLECTIONS = gql`
  query MyQuery(
    $keywords: [String]
    $offset: Int
    $sort: SortOrder
    $categoryIds: [Int]
    $maxCorrectRate: Int
  ) {
    searchCollections(
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
          description
          access
          category {
            id
            name
          }
        }
        quizCount
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
