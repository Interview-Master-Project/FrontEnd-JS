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
  // zustand로 formData를 가져오고 data를 그에 맞게 요청
  const { keywords, sort } = useSearchStore();

  console.log(keywords);

  const { data } = useQuery<IData>(SEARCH_COLLECTIONS, {
    variables: {
      keywords: keywords,
      offset: skip,
      sort: sort,
    },
  });

  if (!data) return null;

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
