import { gql } from "@apollo/client";

export const START_SOLVE_COLLECTION = gql`
  mutation StartSolveCollection($collectionId: ID!) {
    startSolveCollection(collectionId: $collectionId) {
      id
    }
  }
`;
