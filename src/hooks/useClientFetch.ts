import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from "@apollo/client";
import { useCookies } from "next-client-cookies";

/**
 * 클라이언트 컴포넌트 전용 graphql 데이터 페칭 커스텀 훅
 * @param query 쿼리
 * @param options 변수 등의 옵션
 * @param requiresAuth 토큰 필요 여부
 * @returns data(데이터), error(에러처리), loading(로딩처리)
 */
export function useClientFetch<TData = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, OperationVariables>,
  requiresAuth: boolean = true
) {
  const cookies = useCookies();
  const token = cookies.get("authToken");

  const headers = requiresAuth
    ? { Authorization: `Bearer ${token}` }
    : undefined;

  const { data, error, loading } = useQuery<TData>(query, {
    ...options,
    context: {
      headers,
    },
  });

  return { data, error, loading };
}
