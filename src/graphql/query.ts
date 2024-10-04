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

// 유저의 컬렉션 목록
/**
 * (Arguments) offset
 * (Arguments) pageSize
 */
export const MY_COLLECTIONS = gql`
  query MyQuery {
    myCollections(paging: { offset: 0, pageSize: 5 }, sort: LATEST) {
      collections {
        id
        access
        imgUrl
        name
      }
    }
  }
`;

// 유저의 히스토리 목록
/**
 * (Arguments) offset
 * (Arguments) pageSize
 */
export const MY_HISTORY = gql`
  query MyQuery {
    myHistory(filter: PUBLIC, paging: { offset: 0, pageSize: 5 }) {
      collections {
        id
        name
        imgUrl
        access
      }
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
