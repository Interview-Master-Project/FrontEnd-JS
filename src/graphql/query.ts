import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query MyQuery {
    me {
      id
      nickname
      oAuthProvider
    }
  }
`;

export const USER_ATTEMPTED_COLLECTIONS = gql`
  query MyQuery {
    userCollectionHistory(paging: { offset: 0, pageSize: 3 }) {
      collections {
        id
        imgUrl
        name
      }
      totalCount
    }
  }
`;
