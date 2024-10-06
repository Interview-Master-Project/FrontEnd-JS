import { apollo } from "@/graphql/apolloClient";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import ISearchCollections from "@/model/search-collections";
import Grid from "./_component/Grid";

export default async function Page() {
  const { data }: { data: ISearchCollections } = await apollo.query({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: "",
    },
  });

  return (
    <>
      <Grid data={data} />
    </>
  );
}
