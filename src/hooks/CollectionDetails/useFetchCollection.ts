import { useQuery } from "@apollo/client";
import { GET_COLLECTION } from "@/graphql/query/get-collection";
import {
  GetCollectionQuery,
  GetCollectionQueryVariables,
  QueryGetCollectionArgs,
} from "@/__api__/types";
import { useGetToken } from "../useGetToken";

export const useFetchCollection = (
  collectionId: QueryGetCollectionArgs["collectionId"]
) => {
  const { headers } = useGetToken();
  const {
    data: collectionData,
    loading: collectionLoading,
    error: collectionError,
  } = useQuery<GetCollectionQuery, GetCollectionQueryVariables>(
    GET_COLLECTION,
    {
      variables: {
        collectionId,
      },
      fetchPolicy: "no-cache",
      context: {
        headers,
      },
    }
  );

  return { collectionData, collectionLoading, collectionError };
};
