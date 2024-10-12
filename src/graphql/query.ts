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

// 컬렉션 검색(최초 렌더링 + 검색 시 모두 사용)
export const SEARCH_COLLECTIONS = gql`
  query MyQuery(
    $keywords: [String]
    $offset: Int
    $sort: SortOrder
    $categoryIds: [Int]
  ) {
    searchCollections(
      keywords: $keywords
      paging: { offset: $offset, pageSize: 6 }
      sort: $sort
      categoryIds: $categoryIds
    ) {
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
      collectionsWithAttempt {
        quizCount
        recentAttempts
        recentCorrectAttempts
        totalAttempts
        totalCorrectAttempts
        collection {
          id
          imgUrl
          name
          access
          description
          category {
            name
          }
        }
      }
    }
  }
`;
