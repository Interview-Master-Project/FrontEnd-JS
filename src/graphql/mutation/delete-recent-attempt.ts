import { gql } from "@apollo/client";

export const DELETE_RECENT_ATTEMPT = gql`
  mutation DeleteRecentAttempt($userCollectionAttemptId: ID!) {
    deleteRecentAttempt(userCollectionAttemptId: $userCollectionAttemptId)
  }
`;
