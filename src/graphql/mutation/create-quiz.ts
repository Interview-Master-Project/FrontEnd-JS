import { gql } from "@apollo/client";

export const CREATE_QUIZ = gql`
  mutation MyMutation($input: CreateQuizInput!) {
    createQuiz(createQuizInput: $input) {
      id
    }
  }
`;
