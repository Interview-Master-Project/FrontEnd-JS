import { gql } from "@apollo/client";

export const GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID = gql`
  query GetQuizzesWithAttemptByCollectionId($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        answer
        updatedAt
      }
      recentAnswerAt
      totalAttempts
      totalCorrectAttempts
    }
  }
`;
