import { gql } from "@apollo/client";

export const USER_ATTEMPTED_COLLECTIONS = gql`
  query MyQuery {
    userCollectionHistory(paging: { offset: 0, pageSize: 3 }) {
      collections {
        id
        imgUrl
        name
      }
      totalCount
    }
  }
`;

export const PROBLEM_INFO = gql`
  query MyQuery($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
      }
    }
  }
`;
