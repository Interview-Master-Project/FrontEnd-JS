import { useQuery } from "@apollo/client";
import { ME } from "@/graphql/query/me";
import { MeQuery } from "@/__api__/types";
import { useGetToken } from "@/hooks/useGetToken";

export const useFetchMe = () => {
  const { headers } = useGetToken();
  const {
    data: meData,
    loading,
    error,
  } = useQuery<MeQuery>(ME, {
    fetchPolicy: "cache-only",
    context: {
      headers,
    },
  });

  return { meData, loading, error };
};
