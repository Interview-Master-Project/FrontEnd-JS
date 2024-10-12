import { getTokenFromCookies } from "@/utils/getToken";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const token = getTokenFromCookies();

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`,
      headers: {
        Authorization: `Bearer ${
          token || process.env.NEXT_PUBLIC_STATIC_TOKEN
        }`,
      },
    }),
  });
});

export const apollo = getClient();
