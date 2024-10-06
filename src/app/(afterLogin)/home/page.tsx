import { apollo } from "@/graphql/apolloClient";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import IData from "@/model/search-collections";
import Grid from "./_component/Grid";

export default async function Page() {
  const { data }: { data: IData } = await apollo.query({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: "",
      offset: 0,
      pageSize: 6,
    },
  });

  return (
    <>
      <Grid data={data} />
    </>
  );
}
