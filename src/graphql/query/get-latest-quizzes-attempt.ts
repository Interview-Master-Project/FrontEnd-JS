import { gql } from "@apollo/client";

export interface IQuizzesAttempts {
  quiz: { id: string };
  isCorrect: boolean;
}

export interface IData {
  getLatestQuizzesAttempt: IQuizzesAttempts[];
}

export const GET_LATEST_QUIZZES_ATTEMPT = gql`
  query GetLatestQuizzesAttempt($userCollectionAttemptId: ID!) {
    getLatestQuizzesAttempt(userCollectionAttemptId: $userCollectionAttemptId) {
      quiz {
        id
      }
      isCorrect
    }
  }
`;
