"use client";

import Grid from "./_component/Grid";
import Paging from "./_component/Paging";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import IData from "@/model/search-collections";
import { SEARCH_COLLECTIONS } from "@/graphql/query";
import { useSearchStore } from "@/store/useSearchStore";

export default function Page() {
  const [skip, setSkip] = useState(0); // 컬렉션 슬라이싱
  const { keywords, sort, categories } = useSearchStore();

  const { data } = useQuery<IData>(SEARCH_COLLECTIONS, {
    variables: {
      keywords,
      offset: skip,
      sort,
      categoryIds: categories.map(({ id }) => +id),
    },
  });

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
