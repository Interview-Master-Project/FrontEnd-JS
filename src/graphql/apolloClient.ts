import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

// HTTP 링크 설정
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`,
});

// setContext를 사용하여 Authorization 헤더 추가
const authLink = setContext((_, { headers }) => {
  // 서버 컴포넌트에서는 request 객체에서 토큰을 가져올 수 없으므로 빈 문자열로 처리
  // 클라이언트 컴포넌트에서는 localStorage나 다른 스토리지에서 토큰을 가져올 수 있음
  // RSC에서는 주로 서버 사이드에서만 실행되므로 미리 토큰을 props나 context로 전달받아 사용 가능

  // 예시로 localStorage에서 토큰을 가져오는 코드 (클라이언트에서만 사용)
  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const token = process.env.NEXT_PUBLIC_STATIC_TOKEN || "";

  console.log("Apollo Client Authorization Token: ", token); // 토큰 확인

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client 초기화
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
});
