import { useQuery } from "@apollo/client";
import {
  GetQuizzesWithAttemptByCollectionIdQuery,
  GetQuizzesWithAttemptByCollectionIdQueryVariables,
  QueryGetQuizzesWithAttemptByCollectionIdArgs,
} from "@/__api__/types";
import { GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID } from "@/graphql/query/get-quizzes-by-collection-id";
import { useGetToken } from "../useGetToken";

export const useFetchQuiz = (
  collectionId: QueryGetQuizzesWithAttemptByCollectionIdArgs["collectionId"]
) => {
  const { headers } = useGetToken();
  const {
    data: quizData,
    loading: quizLoading,
    error: quizError,
  } = useQuery<
    GetQuizzesWithAttemptByCollectionIdQuery,
    GetQuizzesWithAttemptByCollectionIdQueryVariables
  >(GET_QUIZZES_WITH_ATTEMPT_BY_COLLECTION_ID, {
    variables: {
      collectionId,
    },
    fetchPolicy: "no-cache",
    context: {
      headers,
    },
  });

  return { quizData, quizLoading, quizError };
};
