"use client";

import { useSearchGridStore } from "@/store/useSearchGridStore";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import { HiOutlineSquares2X2 as CardSwitchIcon } from "react-icons/hi2";
import { HiMenu as ListSwitchIcon } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Selector from "@/app/_component/selector/Selector";
import styles from "./showSelect.module.scss";

export default function ShowSelect() {
  const { changeGrid } = useSearchGridStore();
  const { sort, offset, changeSort } = useSortOffsetStore();

  const router = useRouter();
  const handleSort = (newSort: string) => {
    router.push(`/explore?sort=${newSort}&offset=${offset}`);
    changeSort(newSort);
  };

  return (
    <div className={styles.showSelect}>
      <div className={styles.cardListContainer}>
        <CardSwitchIcon onClick={() => changeGrid("card")} />
        <ListSwitchIcon onClick={() => changeGrid("list")} />
      </div>
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
