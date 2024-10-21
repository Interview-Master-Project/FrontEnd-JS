import { fetchQueryData } from "@/utils/fetchQueryData";
import { SEARCH_COLLECTIONS, IData } from "@/graphql/query/search-collections";
import ShowSelect from "./_component/ShowSelect";
import Grid from "./_component/Grid";

type Props = {
  searchParams: { [key: string]: string };
};

export default async function Page({ searchParams }: Props) {
  const { data: initialData } = await fetchQueryData<IData>({
    query: SEARCH_COLLECTIONS,
    variables: {
      keywords: [],
      offset: 0,
      sort: searchParams.sort || "LATEST",
      categoryIds: [],
    },
    requiresAuth: true,
  });

  if (!initialData) return <p>정보를 불러오는 데 실패했습니다.</p>; // data가 없다면 보여줄 화면

  return (
    <>
      <ShowSelect />
      <Grid initialData={initialData} />
    </>
  );
}
