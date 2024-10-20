import { fetchQueryData } from "@/utils/fetchQueryData";
import { SEARCH_COLLECTIONS, IData } from "@/graphql/query/search-collections";
import Grid from "./_component/Grid";
import Navigator from "./_component/Navigator";

export default async function Page() {
  const { data, loading, error } = await fetchQueryData<IData>({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: [],
      offset: 0,
      sort: "LATEST",
    },
    requiresAuth: true,
  });

  if (!data) return null; // data가 없다면 보여줄 화면

  return (
    <>
      <Navigator initialOffset={0} />
      {/* <Grid data={data} /> */}
      <Navigator initialOffset={0} />
    </>
  );
}
