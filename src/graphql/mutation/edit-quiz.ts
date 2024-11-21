import { gql } from "@apollo/client";

export const EDIT_QUIZ = gql`
  mutation EditQuiz($input: EditQuizInput!, $quizId: ID!) {
    editQuiz(editQuizInput: $input, quizId: $quizId) {
      id
    }
  }
`;
