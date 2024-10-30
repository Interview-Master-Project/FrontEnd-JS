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
  quizzes: IQuizzes[];
  creator: {
    id: string;
  };
}

export interface IData {
  getCollection: IGetCollection;
}

export const GET_COLLECTION = gql`
  query MyQuery($collectionId: ID!) {
    getCollection(collectionId: $collectionId) {
      id
      name
      imgUrl
      access
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
