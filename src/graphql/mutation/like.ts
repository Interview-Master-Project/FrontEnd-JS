import { gql } from "@apollo/client";

export const LIKE = gql`
  mutation MyMutation($collectionId: ID!) {
    like(collectionId: $collectionId)
  }
`;
