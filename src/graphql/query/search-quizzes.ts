import { gql } from "@apollo/client";

interface ICollection {
  id: string;
  name: string;
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
  category: { id: string; name: string };
}

interface IQuiz {
  id: string;
  question: string;
  collection: ICollection;
}

interface IQuizzesWithAttempt {
  quiz: IQuiz;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

interface ISearchQuizzes {
  quizzesWithAttempt: IQuizzesWithAttempt[];
  pageInfo: IPageInfo;
}

export interface IData {
  searchQuizzes: ISearchQuizzes;
}

// 퀴즈 검색 (only 로그인 시)
export const SEARCH_QUIZZES = gql`
  query SearchQuizzes(
    $keywords: [String]
    $offset: Int
    $sort: SortOrder
    $categoryIds: [Int]
    $maxCorrectRate: Int
  ) {
    searchQuizzes(
      keywords: $keywords
      paging: { offset: $offset, pageSize: 8 }
      sort: $sort
      categoryIds: $categoryIds
      maxCorrectRate: $maxCorrectRate
    ) {
      quizzesWithAttempt {
        quiz {
          id
          question
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
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
    }
  }
`;
