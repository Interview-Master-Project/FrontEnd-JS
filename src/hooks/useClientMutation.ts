import {
  DocumentNode,
  MutationHookOptions,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { useCookies } from "next-client-cookies";

/**
 * 클라이언트 컴포넌트 전용 graphql 뮤테이션 커스텀 훅
 * @param mutation 실행할 뮤테이션
 * @param options 변수 등의 옵션
 * @param requiresAuth 토큰 필요 여부
 * @returns mutate 함수와 상태 (data, error, loading)
 */
export function useClientMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>,
  requiresAuth: boolean = true
) {
  const cookies = useCookies();
  const token = cookies.get("authToken");

  const headers = requiresAuth
    ? { Authorization: `Bearer ${token}` }
    : undefined;

  // useMutation 훅을 통해 뮤테이션 상태를 반환
  const [executeMutation, { data, error, loading }] = useMutation<
    TData,
    TVariables
  >(mutation, {
    ...options,
    context: {
      headers,
    },
  });

  return { mutate: executeMutation, data, error, loading };
}
