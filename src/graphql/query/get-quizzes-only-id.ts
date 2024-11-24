import { gql } from "@apollo/client";

export const GET_QUIZZES_ONLY_ID = gql`
  query GetQuizzesOnlyId($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
      }
    }
  }
`;
