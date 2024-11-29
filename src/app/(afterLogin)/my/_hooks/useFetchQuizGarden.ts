import { useQuery } from "@apollo/client";
import {
  GetQuizGardenQuery,
  GetQuizGardenQueryVariables,
} from "@/__api__/types";
import { GET_QUIZ_GARDEN } from "@/graphql/query/get-quiz-garden";
import { useGetToken } from "@/hooks/useGetToken";
import dayjs from "dayjs";

export const useFetchQuizGarden = () => {
  const { headers } = useGetToken();
  const {
    data: quizGardenData,
    loading,
    error,
  } = useQuery<GetQuizGardenQuery, GetQuizGardenQueryVariables>(
    GET_QUIZ_GARDEN,
    {
      variables: {
        endDate: dayjs().format("YYYY-MM-DD"),
        startDate: dayjs().subtract(140, "day").format("YYYY-MM-DD"),
      },
      context: {
        headers,
      },
      fetchPolicy: "cache-and-network", // 일단 캐시를 사용 후 네트워크 요청을 보냄
      pollInterval: 600000, // 10분마다 풀링
      notifyOnNetworkStatusChange: true, // 네트워크 상태 변화에 따른 업데이트 확인
    }
  );

  return { quizGardenData, loading, error };
};
