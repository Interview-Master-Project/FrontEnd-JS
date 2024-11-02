import { gql } from "@apollo/client";

export const DELETE_QUIZ = gql`
  mutation MyMutation($quizId: ID!) {
    deleteQuiz(quizId: $quizId)
  }
`;
