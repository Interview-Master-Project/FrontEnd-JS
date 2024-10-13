import { cookies } from "next/headers";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const token = cookies().get("authToken")?.value;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  });
});

export const apollo = getClient();
