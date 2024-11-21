import { gql } from "@apollo/client";

export const LIKE = gql`
  mutation Like($collectionId: ID!) {
    like(collectionId: $collectionId)
  }
`;
