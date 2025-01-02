import { gql } from "@apollo/client";

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
