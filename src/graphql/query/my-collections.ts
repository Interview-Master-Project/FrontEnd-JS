import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  access: "PUBLIC" | "PRIVATE";
  imgUrl: string;
  description: string;
  likes: number;
}

interface ICollectionsWithAttempt {
  collection: ICollection;
  isLiked: boolean;
}

export interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

interface IMyCollections {
  collectionsWithAttempt: ICollectionsWithAttempt[];
  pageInfo: IPageInfo;
}

export interface IData {
  myCollections: IMyCollections;
}

/** 유저의 컬렉션 목록
 * (Arguments) paging: { offset, pageSize }
 * (Arguments) sort 정렬 조건
 */
export const MY_COLLECTIONS = gql`
  query MyCollections($sort: SortOrder, $offset: Int) {
    myCollections(sort: $sort, paging: { offset: $offset, pageSize: 5 }) {
      collectionsWithAttempt {
        collection {
          id
          name
          access
          imgUrl
          description
          likes
        }
        isLiked
      }
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
    }
  }
`;
