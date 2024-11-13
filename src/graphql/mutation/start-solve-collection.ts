import { gql } from "@apollo/client";

export const START_SOLVE_COLLECTION = gql`
  mutation MyMutation($collectionId: ID!) {
    startSolveCollection(collectionId: $collectionId) {
      id
    }
  }
`;
