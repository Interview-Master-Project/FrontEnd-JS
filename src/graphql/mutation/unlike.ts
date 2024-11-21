import { gql } from "@apollo/client";

export const UNLIKE = gql`
  mutation Unlike($collectionId: ID!) {
    unlike(collectionId: $collectionId)
  }
`;
