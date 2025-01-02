"use client";

import { useRouter } from "next/navigation";
import Selector from "@/app/_component/selector/Selector";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import { SortOrder } from "@/__api__/types";

export default function Sort() {
  const router = useRouter();
  const { offset, changeSort } = useSortOffsetStore();
  const handleSort = (newSort: SortOrder) => {
    router.push(`/my?sort=${newSort}&offset=${offset}`);
    changeSort(newSort);
  };

  return (
    <Selector
      width={150}
      onChange={handleSort}
      defaultValue={offset}
      options={[
        { value: "LATEST", label: "최신순" },
        { value: "LOWEST_ACCURACY", label: "정답률 낮은 순" },
        { value: "MOST_LIKED", label: "좋아요 많은 순" },
      ]}
    />
  );
}
