import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query MyPage {
    myPage(
      offset: 0
      limit: 3
      startDate: "2024-05-01"
      endDate: "2024-09-12"
    ) {
      user {
        id
        nickname
        oAuthProvider
      }
      collectionPage {
        collections {
          id
          name
          access
          imgUrl
        }
        totalCount
        hasNext
      }
      quizGardens {
        date
        quizzesSolved
        dayIndex
        weekIndex
      }
    }
  }
`;

export const USER_ATTEMPTED_COLLECTIONS = gql`
  query History {
    userAttemptedCollections(offset: 0, limit: 4) {
      collections {
        id
        name
        access
        imgUrl
      }
      totalCount
      hasNext
    }
  }
`;
