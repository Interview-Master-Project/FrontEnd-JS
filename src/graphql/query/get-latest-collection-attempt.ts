import { gql } from "@apollo/client";

export interface IData {
  getLatestCollectionAttempt: {
    id: string;
    completedAt: string | null;
  };
}

export const GET_LATEST_COLLECTION_ATTEMPT = gql`
  query MyQuery($collectionId: ID!) {
    getLatestCollectionAttempt(collectionId: $collectionId) {
      id
      completedAt
    }
  }
`;
