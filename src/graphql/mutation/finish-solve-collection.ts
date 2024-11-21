import { gql } from "@apollo/client";

export const FINISH_SOLVE_COLLECTION = gql`
  mutation FinishSolveCollection($userCollectionAttemptId: ID!) {
    finishSolveCollection(userCollectionAttemptId: $userCollectionAttemptId) {
      id
    }
  }
`;
