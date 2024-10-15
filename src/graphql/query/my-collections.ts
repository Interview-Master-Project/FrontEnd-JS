import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  access: "PUBLIC" | "PRIVATE";
  imgUrl: string;
}

export interface ICollections {
  collection: ICollection;
  totalAttempts: number;
  totalCorrectAttempts: number;
  recentAttempts: number;
  recentCorrectAttempts: number;
}

export interface ICollectionsWithAttempt {
  collectionsWithAttempt: ICollections[];
}

export interface IData {
  myCollections: ICollectionsWithAttempt;
}

// 유저의 컬렉션 목록
/**
 * (Arguments) offset
 * (Arguments) pageSize
 */
export const MY_COLLECTIONS = gql`
  query MyQuery($sort: SortOrder) {
    myCollections(paging: { offset: 0, pageSize: 5 }, sort: $sort) {
      collectionsWithAttempt {
        collection {
          id
          name
          access
          imgUrl
        }
        totalAttempts
        totalCorrectAttempts
        recentAttempts
        recentCorrectAttempts
      }
      pageInfo {
        hasNextPage
        currentPage
        totalPages
      }
    }
  }
`;
