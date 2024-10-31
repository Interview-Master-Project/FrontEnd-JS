import { cookies } from "next/headers";
import { fetchQueryData } from "@/utils/fetchQueryData";
import {
  SEARCH_COLLECTIONS_FOR_AUTH_USER,
  IData as IALData,
} from "@/graphql/query/search-collections-for-auth-user";
import {
  SEARCH_COLLECTIONS_FOR_GUEST,
  IData as IBLData,
} from "@/graphql/query/search-collections-for-guest";
import ShowSelect from "./_component/ShowSelect";
import Grid from "./_component/Grid";

type Props = {
  searchParams: { [key: string]: string };
};

export default async function Page({ searchParams }: Props) {
  const token = cookies().get("authToken")?.value;

  const { data: initialData } = token
    ? await fetchQueryData<IALData>({
        query: SEARCH_COLLECTIONS_FOR_AUTH_USER,
        variables: {
          keywords: [],
          offset: 0,
          sort: searchParams.sort || "LATEST",
          categoryIds: [],
        },
        requiresAuth: true,
      })
    : await fetchQueryData<IBLData>({
        query: SEARCH_COLLECTIONS_FOR_GUEST,
        variables: {
          categoryIds: [],
          keywords: [],
          offset: 0,
        },
        requiresAuth: false,
      });

  if (!initialData) return <p>정보를 불러오는 데 실패했습니다.</p>; // data가 없다면 보여줄 화면

  return (
    <>
      <ShowSelect />
      <Grid initialData={initialData} isLoggedIn={!!token} />
    </>
  );
}
