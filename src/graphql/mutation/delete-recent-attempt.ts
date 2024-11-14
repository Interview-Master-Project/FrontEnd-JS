import { gql } from "@apollo/client";

export const DELETE_RECENT_ATTEMPT = gql`
  mutation MyMutation($userCollectionAttemptId: ID!) {
    deleteRecentAttempt(userCollectionAttemptId: $userCollectionAttemptId)
  }
`;
