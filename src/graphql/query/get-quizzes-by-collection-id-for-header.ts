import { gql } from "@apollo/client";

export const GET_QUIZZES_BY_COLLECTION_ID_FOR_HEADER = gql`
  query GetQuizzesWithAttemptByCollectionIdForHeader($collectionId: ID!) {
    getQuizzesWithAttemptByCollectionId(collectionId: $collectionId) {
      quiz {
        id
        question
        answer
        updatedAt
        collection {
          id
          name
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
