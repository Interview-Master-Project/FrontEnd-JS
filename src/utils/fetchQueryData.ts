import { apollo } from "@/graphql/apolloClient";
import { FetchPolicy } from "@apollo/client";
import { DocumentNode } from "graphql";
import { cookies } from "next/headers";

interface FetchOptions {
  query: DocumentNode; // 쿼리
  variables?: Record<string, any>; // 쿼리 변수
  requiresAuth?: boolean; // 인증 필요 여부 (기본값: true)
  fetchPolicy?: FetchPolicy;
}

interface FetchResponse<T> {
  data: T;
  loading: boolean;
  error?: Error;
}

// 서버 컴포넌트 전용 graphql 데이터 페칭 비동기 함수
export async function fetchQueryData<T = any>({
  query,
  variables = {},
  requiresAuth = true,
  fetchPolicy = "cache-first",
}: FetchOptions): Promise<FetchResponse<T>> {
  const token = requiresAuth ? cookies().get("authToken")?.value : null;

  const { data, loading, error } = await apollo.query<T>({
    query,
    variables,
    context: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    fetchPolicy,
  });

  return { data, loading, error };
}
