import { gql } from "@apollo/client";

/** 퀴즈 잔디밭 정보
 * (Arguments) startDate "YYYY-MM-DD"
 * (Arguments) endDate "YYYY-MM-DD"
 */
export const GET_QUIZ_GARDEN = gql`
  query GetQuizGarden($endDate: String!, $startDate: String!) {
    getQuizGarden(endDate: $endDate, startDate: $startDate) {
      date
      quizzesSolved
    }
  }
`;
