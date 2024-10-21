"use client";

import { useSearchGridStore } from "@/store/useSearchGridStore";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";

// 보기 방식 선택(카드 or 리스트)
// sort 방식 선택
export default function ShowSelect() {
  const { changeGrid } = useSearchGridStore();
  const { sort, changeSort } = useSortOffsetStore();

  return null;
}
