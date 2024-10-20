import { gql } from "@apollo/client";

interface ICategory {
  id: string;
  name: string;
}

export interface IData {
  getAllCategories: ICategory[];
}

// 카테고리 id와 카테고리명
export const GET_ALL_CATEGORIES = gql`
  query MyQuery {
    getAllCategories {
      id
      name
    }
  }
`;
