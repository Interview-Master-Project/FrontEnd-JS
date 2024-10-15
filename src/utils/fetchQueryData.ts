import { apollo } from "@/graphql/apolloClient";
import { DocumentNode } from "graphql";
import { cookies } from "next/headers";

interface FetchOptions {
  query: DocumentNode; // 쿼리
  variables?: Record<string, any>; // 쿼리 변수
  requiresAuth?: boolean; // 인증 필요 여부 (기본값: true)
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
}: FetchOptions): Promise<FetchResponse<T>> {
  const token = requiresAuth ? cookies().get("authToken")?.value : null;

  const { data, loading, error } = await apollo.query<T>({
    query,
    variables,
    context: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });

  return { data, loading, error };
}
