import { gql } from "@apollo/client";

export const UNLIKE = gql`
  mutation MyMutation($collectionId: ID!) {
    unlike(collectionId: $collectionId)
  }
`;
