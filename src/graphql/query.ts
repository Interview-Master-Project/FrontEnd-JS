import { gql } from "@apollo/client";

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
  query MyQuery($sort: SortOrder) {
    myCollections(paging: { offset: 0, pageSize: 5 }, sort: $sort) {
      collectionsWithAttempt {
        collection {
          id
          name
          access
          imgUrl
        }
        totalAttempts
        totalCorrectAttempts
        recentAttempts
        recentCorrectAttempts
      }
      pageInfo {
        hasNextPage
        currentPage
        totalPages
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

// 카테고리 id와 카테고리명
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

export const GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID = gql`
  query MyQuery($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        answer
        access
        collection {
          imgUrl
          name
          category {
            name
          }
        }
      }
      recentAnswerAt
      totalAttempts
      totalCorrectAttempts
    }
  }
`;

export const PROBLEM_INFO = gql`
  query MyQuery($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
      }
    }
  }
`;
