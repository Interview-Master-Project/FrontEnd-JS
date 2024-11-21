import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  access: "PRIVATE" | "PUBLIC";
  category: { id: string; name: string };
}

interface IQuiz {
  id: string;
  question: string;
  answer: string;
  collection: ICollection;
}

export interface IQuizzes {
  quiz: IQuiz;
  recentAnswerAt: string | null;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

export interface IData {
  getQuizzesWithAttemptByCollectionId: IQuizzes[];
}

// 리다이렉트 목적 퀴즈 아이디만 추출
export const GET_QUIZZES_ONLY_ID = gql`
  query GetQuizzesOnlyId($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
      }
    }
  }
`;

// 컬렉션에 속한 퀴즈들과 유저의 퀴즈 시도 정보
export const GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID = gql`
  query GetQuizzesWithAttemptByCollectionId($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        answer
        collection {
          id
          name
          imgUrl
          access
          category {
            id
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

interface IBriefQuiz {
  id: string;
  question: string;
  access: "PRIVATE" | "PUBLIC";
  updatedAt: string;
}

interface IBriefQuizzes {
  quiz: IBriefQuiz;
  recentAnswerAt: string | null;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

export interface IBriefData {
  getQuizzesWithAttemptByCollectionId: IBriefQuizzes[];
}

export const GET_QUIZ_BRIEF = gql`
  query GetQuizBrief($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        access
        updatedAt
      }
      recentAnswerAt
      totalAttempts
      totalCorrectAttempts
    }
  }
`;

interface IHeaderQuiz {
  id: string;
  question: string;
  collection: ICollection;
}

interface IHeaderQuizzes {
  quiz: IHeaderQuiz;
}

export interface IHeaderData {
  getQuizzesWithAttemptByCollectionId: IHeaderQuizzes[];
}

export const GET_QUIZ_HEADER = gql`
  query GetQuizHeader($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        collection {
          id
          name
          category {
            id
            name
          }
        }
      }
    }
  }
`;
