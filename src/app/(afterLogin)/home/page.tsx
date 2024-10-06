"use client";

import Grid from "./_component/Grid";
import Paging from "./_component/Paging";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import IData from "@/model/search-collections";
import { SEARCH_COLLECTIONS } from "@/graphql/query";

export default function Page() {
  const [skip, setSkip] = useState(0); // 컬렉션 슬라이싱
  const { data } = useQuery<IData>(SEARCH_COLLECTIONS, {
    variables: {
      keywords: [""],
      offset: skip,
      sort: "LATEST",
    },
  });

  const handleChangeSkip = () => {};

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
