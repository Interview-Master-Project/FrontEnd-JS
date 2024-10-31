import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
  description: string;
  likes: number;
  category: {
    id: string;
    name: string;
  }
}

interface ICollectionsWithAttempt {
  collection: ICollection; 
  quizCount: number;
  recentAttempts: number;
  recentCorrectAttempts: number;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

interface ISearchCollectionsForGuest {
  collectionsWithAttempt: ICollectionsWithAttempt[];
  pageInfo: IPageInfo;
}

export interface IData {
  searchCollectionsForGuest: ISearchCollectionsForGuest;
}

// 컬렉션 검색(비로그인용)
export const SEARCH_COLLECTIONS_FOR_GUEST = gql`
query MyQuery(
  $categoryIds: [Int]
  $keywords: [String]
  $offset: Int
) {
  searchCollectionsForGuest(
    categoryIds: $categoryIds
    keywords: $keywords
    paging: { offset: $offset, pageSize: 8 }
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
`