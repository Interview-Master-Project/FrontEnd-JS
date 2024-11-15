import { gql } from "@apollo/client";

export const FINISH_SOLVE_COLLECTION = gql`
  mutation MyMutation($userCollectionAttemptId: ID!) {
    finishSolveCollection(userCollectionAttemptId: $userCollectionAttemptId) {
      id
    }
  }
`;
