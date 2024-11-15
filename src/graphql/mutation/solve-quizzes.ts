import { gql } from "@apollo/client";

export const SOLVE_QUIZZES = gql`
  mutation MyMutation(
    $quizResults: [QuizResultInput!]!
    $userCollectionAttemptId: ID!
  ) {
    solveQuizzes(
      quizResults: $quizResults
      userCollectionAttemptId: $userCollectionAttemptId
    )
  }
`;
