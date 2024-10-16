import { gql } from "@apollo/client";

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
