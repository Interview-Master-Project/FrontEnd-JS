import { gql } from "@apollo/client";

/**
 * date: 날짜 정보
 * dayIndex: 요일 인덱스
 * quizzesSolved: 풀이 횟수
 * weekIndex: 주차 인덱스
 */
interface ILog {
  date: string;
  dayIndex: number;
  quizzesSolved: number;
  weekIndex: number;
}

export interface IData {
  getQuizGarden: ILog[];
}

/** 퀴즈 잔디밭 정보
 * (Arguments) startDate "YYYY-MM-DD"
 * (Arguments) endDate "YYYY-MM-DD"
 */
export const GET_QUIZ_GARDEN = gql`
  query GetQuizGarden($startDate: String!, $endDate: String!) {
    getQuizGarden(startDate: $startDate, endDate: $endDate) {
      date
      dayIndex
      quizzesSolved
      weekIndex
    }
  }
`;
