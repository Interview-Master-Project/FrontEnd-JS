import { gql } from "@apollo/client";

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($collectionId: ID!) {
    deleteCollection(collectionId: $collectionId)
  }
`;
