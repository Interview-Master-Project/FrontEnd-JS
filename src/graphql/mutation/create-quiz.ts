import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
  mutation CreateQuiz($input: CreateQuizInput!) {
    createQuiz(createQuizInput: $input) {
      id
    }
  }
`;
