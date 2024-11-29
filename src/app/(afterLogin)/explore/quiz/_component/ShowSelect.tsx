"use client";

import { useRouter } from "next/navigation";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import { SortOrder } from "@/__api__/types";
import Selector from "@/app/_component/selector/Selector";
import styles from "./showSelect.module.scss";

export default function ShowSelect() {
  const router = useRouter();
  const { offset, changeSort } = useSortOffsetStore();

  const handleSort = (newSort: SortOrder) => {
    router.push(`/explore/quiz?sort=${newSort}&offset=${offset}`);
    changeSort(newSort);
  };

  return (
    <div className={styles.selectorWrapper}>
      <Selector
        width={150}
        onChange={handleSort}
        options={[
          { value: "LATEST", label: "최신순" },
          { value: "LOWEST_ACCURACY", label: "정답률 낮은 순" },
        ]}
      />
    </div>
  );
}
