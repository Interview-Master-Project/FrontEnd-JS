import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const isProduction = process.env.NODE_ENV === "production";

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: isProduction
        ? `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`
        : "http://localhost:3000/graphql",
    }),
  });
});

export const apollo = getClient();
