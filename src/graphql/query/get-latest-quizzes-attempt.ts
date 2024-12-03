import { gql } from "@apollo/client";

export const GET_LATEST_QUIZZES_ATTEMPT = gql`
  query GetLatestQuizzesAttempt($userCollectionAttemptId: ID!) {
    getLatestQuizzesAttempt(userCollectionAttemptId: $userCollectionAttemptId) {
      quiz {
        id
      }
      isCorrect
      answeredAt
    }
  }
`;
