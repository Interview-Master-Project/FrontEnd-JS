import { fetchQueryData } from "@/utils/fetchQueryData";
import { SEARCH_COLLECTIONS, IData } from "@/graphql/query/search-collections";
import Grid from "./_component/Grid";
// import Navigator from "./_component/Navigator";

type Props = {
  searchParams: { [key: string]: string };
};

export default async function Page({ searchParams }: Props) {
  const {
    data: initialData,
    loading,
    error,
  } = await fetchQueryData<IData>({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: [],
      offset: 0,
      sort: searchParams.sort || "LATEST",
      categoryIds: [],
    },
    requiresAuth: true,
  });

  if (!initialData) return null; // data가 없다면 보여줄 화면

  return (
    <>
      {/* <ResultHeader /> */}
      <Grid initialData={initialData} />
      {/* <Navigator initialOffset={0} /> */}
      {/* <Grid data={data} /> */}
      {/* <Navigator initialOffset={0} /> */}
    </>
  );
}
