import { useQuery } from "@apollo/client";
import { MY_HISTORY } from "@/graphql/query/my-history";
import { MyHistoryQuery, MyHistoryQueryVariables } from "@/__api__/types";
import { useGetToken } from "@/hooks/useGetToken";

const DEFAULT_OFFSET = 0; // 상위 5개만 노출

export const useFetchMyHistory = () => {
  const { headers } = useGetToken();
  const {
    data: myHistoryData,
    loading,
    error,
  } = useQuery<MyHistoryQuery, MyHistoryQueryVariables>(MY_HISTORY, {
    variables: {
      offset: DEFAULT_OFFSET,
    },
    context: {
      headers,
    },
    // 기타 옵션 없음
  });

  return { myHistoryData, loading, error };
};
