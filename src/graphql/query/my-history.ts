import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  description: string;
  updatedAt: string;
  access: "PUBLIC" | "PRIVATE";
  likes: number;
}

interface ICollectionsWithAttempt {
  collection: ICollection;
}

interface IMyHistory {
  collectionsWithAttempt: ICollectionsWithAttempt[];
}

export interface IData {
  myHistory: IMyHistory;
}

/** 유저의 히스토리 목록
 * (Arguments) offset
 * (Arguments) pageSize
 */
export const MY_HISTORY = gql`
  query MyHistory($offset: Int, $filter: Access) {
    myHistory(paging: { offset: $offset, pageSize: 5 }, filter: $filter) {
      collectionsWithAttempt {
        collection {
          id
          name
          imgUrl
          description
          updatedAt
          access
          likes
        }
      }
    }
  }
`;
