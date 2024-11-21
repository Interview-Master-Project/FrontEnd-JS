import { gql } from "@apollo/client";

export const SOLVE_QUIZZES = gql`
  mutation SolveQuizzes(
    $quizResults: [QuizResultInput!]!
    $userCollectionAttemptId: ID!
  ) {
    solveQuizzes(
      quizResults: $quizResults
      userCollectionAttemptId: $userCollectionAttemptId
    )
  }
`;
