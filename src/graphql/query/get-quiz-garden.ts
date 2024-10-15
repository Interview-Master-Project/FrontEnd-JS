import { gql } from "@apollo/client";

interface ILog {
  date: string;
  dayIndex: number;
  quizzesSolved: number;
  weekIndex: number;
}

export interface IData {
  getQuizGarden: ILog[];
}

// 퀴즈 잔디밭 정보
/**
 * (Arguments) startDate
 * (Arguments) endDate
 */
export const GET_QUIZ_GARDEN = gql`
  query MyQuery($startDate: String!, $endDate: String!) {
    getQuizGarden(startDate: $startDate, endDate: $endDate) {
      date
      dayIndex
      quizzesSolved
      weekIndex
    }
  }
`;
