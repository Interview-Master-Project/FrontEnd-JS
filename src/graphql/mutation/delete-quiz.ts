import { gql } from "@apollo/client";

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($quizId: ID!) {
    deleteQuiz(quizId: $quizId)
  }
`;
