import { gql } from "@apollo/client";

export const GET_COLLECTION = gql`
  query GetCollection($collectionId: ID!) {
    getCollection(collectionId: $collectionId) {
      id
      name
      imgUrl
      access
      description
      category {
        id
        name
      }
      creator {
        id
      }
    }
  }
`;
