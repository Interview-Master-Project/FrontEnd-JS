import { START_SOLVE_COLLECTION } from "@/graphql/mutation/start-solve-collection";
import { GET_LATEST_COLLECTION_ATTEMPT } from "@/graphql/query/get-latest-collection-attempt";
import { mutateData } from "@/utils/mutateData";
import { cookies } from "next/headers";

async function startSolve(collId: string) {
  const token = cookies().get("authToken")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const { data, loading, error } = await mutateData({
    mutation: START_SOLVE_COLLECTION,
    variables: {
      collectionId: collId,
    },

    refetchQueries: [
      {
        query: GET_LATEST_COLLECTION_ATTEMPT,
        variables: { collectionId: collId },
        context: {
          headers,
        },
        fetchPolicy: "no-cache",
      },
    ],
    requiresAuth: true,
  });

  return { data, loading, error };
}

export default startSolve;
