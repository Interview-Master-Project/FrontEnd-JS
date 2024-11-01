import { gql } from "@apollo/client";

export const EDIT_QUIZ = gql`
  mutation MyMutation($input: EditQuizInput!, $quizId: ID!) {
    editQuiz(editQuizInput: $input, quizId: $quizId) {
      id
    }
  }
`;
