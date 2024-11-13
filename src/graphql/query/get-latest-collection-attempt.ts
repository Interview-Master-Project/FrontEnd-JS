import { gql } from "@apollo/client";

export interface IData {
  getLatestCollectionAttempt: {
    completedAt: string | null;
    user: { id: string };
  };
}

export const GET_LATEST_COLLECTION_ATTEMPT = gql`
  query MyQuery($collectionId: ID!) {
    getLatestCollectionAttempt(collectionId: $collectionId) {
      completedAt
      user {
        id
      }
    }
  }
`;
