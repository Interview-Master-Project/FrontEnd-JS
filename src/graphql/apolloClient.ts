import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "production"
          ? "/graphql"
          : process.env.NEXT_PUBLIC_SERVER_URL_PORT + "/graphql",
    }),
  });
});

export const apollo = getClient();
