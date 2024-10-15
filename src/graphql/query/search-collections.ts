import { gql } from "@apollo/client";

export interface IData {
  searchCollections: ISearchCollections;
}

interface ISearchCollections {
  collectionsWithAttempt: ICollectionInfo[];
  pageInfo: IPageInfo;
}

interface ICollectionInfo {
  quizCount: number;
  recentAttempts: number;
  recentCorrectAttempts: number;
  totalAttempts: number;
  totalCorrectAttempts: number;
  collection: ICollection;
}

interface ICollection {
  id: string;
  imgUrl: string;
  name: string;
  access: "PUBLIC" | "PRIVATE";
  description: string;
  category: { name: string };
}

export interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

// 컬렉션 검색(최초 렌더링 + 검색 시 모두 사용)
export const SEARCH_COLLECTIONS = gql`
  query MyQuery(
    $keywords: [String]
    $offset: Int
    $sort: SortOrder
    $categoryIds: [Int]
  ) {
    searchCollections(
      keywords: $keywords
      paging: { offset: $offset, pageSize: 6 }
      sort: $sort
      categoryIds: $categoryIds
    ) {
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
      collectionsWithAttempt {
        quizCount
        recentAttempts
        recentCorrectAttempts
        totalAttempts
        totalCorrectAttempts
        collection {
          id
          imgUrl
          name
          access
          description
          category {
            name
          }
        }
      }
    }
  }
`;
