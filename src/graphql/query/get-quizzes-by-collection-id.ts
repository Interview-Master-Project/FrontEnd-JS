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

interface IQuizzes {
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
  query MyQuery($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
      }
    }
  }
`;

// 컬렉션에 속한 퀴즈들과 유저의 퀴즈 시도 정보
export const GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID = gql`
  query MyQuery($collectionId: ID!) {
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
