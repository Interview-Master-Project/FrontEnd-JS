"use client";

import { useState } from "react";
import { SEARCH_COLLECTIONS, IData } from "@/graphql/query/search-collections";
import { useSearchStore } from "@/store/useSearchStore";
import { useClientFetch } from "@/hooks/useClientFetch";
import Grid from "./_component/Grid";
import Paging from "./_component/Paging";

export default function Page() {
  const [skip, setSkip] = useState(0); // 컬렉션 슬라이싱
  const { keywords, sort, categories } = useSearchStore();
  const { data, loading, error } = useClientFetch<IData>(
    SEARCH_COLLECTIONS,
    {
      variables: {
        keywords,
        offset: skip,
        sort,
        categoryIds: categories.map(({ id }) => +id),
      },
    },
    true
  );

  if (!data) return null; // data가 없다면 보여줄 화면

  const handleChangeSkip = (offset: number) => {
    setSkip(6 * (offset - 1));
  };

  return (
    <>
      <Grid data={data} />
      <Paging
        pageInfo={data?.searchCollections.pageInfo}
        onChangeSkip={handleChangeSkip}
      />
    </>
  );
}
