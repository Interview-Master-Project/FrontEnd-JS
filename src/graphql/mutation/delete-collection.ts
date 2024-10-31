import { gql } from "@apollo/client";

export const DELETE_COLLECTION = gql`
  mutation MyMutation($collectionId: ID!) {
    deleteCollection(collectionId: $collectionId)
  }
`;
