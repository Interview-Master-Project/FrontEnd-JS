import { apollo } from "@/graphql/apolloClient";
import { QueryOptions } from "@apollo/client";
import { DocumentNode } from "graphql";
import { cookies } from "next/headers";

interface MutateOptions {
  mutation: DocumentNode;
  variables?: Record<string, any>;
  refetchQueries: Array<string | QueryOptions>;
  requiresAuth?: boolean;
}

interface MutateResponse<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

// 서버 컴포넌트 전용 비동기 mutate 함수
export async function mutateData<T = any>({
  mutation,
  variables = {},
  refetchQueries,
  requiresAuth = true,
}: MutateOptions): Promise<MutateResponse<T>> {
  const token = requiresAuth ? cookies().get("authToken")?.value : null;

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const { data } = await apollo.mutate<T>({
      mutation,
      refetchQueries,
      awaitRefetchQueries: true,
      variables,
      context: {
        headers,
      },
    });

    if (!data) throw new Error("mutate Error");

    return {
      data,
      loading: false,
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      loading: false,
      error: error instanceof Error ? error : new Error("Mutate Error"),
    };
  }
}
