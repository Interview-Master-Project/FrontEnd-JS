import { gql } from "@apollo/client";

export interface IQuizzes {
  id: string;
}

interface IGetCollection {
  id: string;
  name: string;
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
  quizzes: IQuizzes[];
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
    }
  }
`;
