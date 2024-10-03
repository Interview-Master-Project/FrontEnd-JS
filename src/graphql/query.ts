import { gql } from "@apollo/client";

// 로그인 유저 정보
export const ME = gql`
  query MyQuery {
    me {
      id
      nickname
      oAuthProvider
    }
  }
`;

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

// not login required
export const ALL_CATEGORIES = gql`
  query MyQuery {
    getAllCategories {
      id
      name
    }
  }
`;

export const USER_ATTEMPTED_COLLECTIONS = gql`
  query MyQuery {
    userCollectionHistory(paging: { offset: 0, pageSize: 3 }) {
      collections {
        id
        imgUrl
        name
      }
      totalCount
    }
  }
`;
