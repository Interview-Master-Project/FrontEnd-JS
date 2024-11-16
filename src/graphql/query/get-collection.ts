import { gql } from "@apollo/client";

export interface IQuizzes {
  id: string;
  access: "PUBLIC" | "PRIVATE";
  question: string;
  updatedAt: string;
}

interface IGetCollection {
  id: string;
  name: string;
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
  description: string;
  category: {
    id: string;
    name: string;
  };
  quizzes: IQuizzes[];
  creator: {
    id: string;
  };
}

export interface IData {
  getCollection: IGetCollection;
}

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
      quizzes {
        id
        access
        question
        updatedAt
      }
      creator {
        id
      }
    }
  }
`;
