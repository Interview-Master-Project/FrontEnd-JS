"use client";

import { getTokenFromCookies } from "@/utils/getToken";
import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  const token = getTokenFromCookies();

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
