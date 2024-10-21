"use client";

import { IPageInfo } from "@/graphql/query/search-collections";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";

// offset을 변경하는 역할
// Grid 컴포넌트 안에서 pageInfo
export default function Navigator({ pageInfo }: { pageInfo: IPageInfo }) {
  const { offset, changeOffset } = useSortOffsetStore();

  return null;
}
