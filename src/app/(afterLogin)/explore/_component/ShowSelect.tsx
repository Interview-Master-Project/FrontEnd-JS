"use client";

import { ChangeEventHandler, useEffect } from "react";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import { HiOutlineSquares2X2 as CardSwitchIcon } from "react-icons/hi2";
import { HiMenu as ListSwitchIcon } from "react-icons/hi";
import { useRouter } from "next/navigation";
import styles from "./showSelect.module.scss";

// 보기 방식 선택(카드 or 리스트)
// sort 방식 선택
// sort를 변경 시 url에 적용
export default function ShowSelect() {
  const { changeGrid } = useSearchGridStore();
  const { sort, offset, changeSort } = useSortOffsetStore();

  const router = useRouter();
  const handleSort: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newSort = e.target.value as "LATEST" | "LOWEST_ACCURACY";
    router.push(`/explore?sort=${newSort}&offset=${offset}`);
    changeSort(newSort);
  };

  return (
    <div className={styles.showSelect}>
      <div className={styles.cardListContainer}>
        <CardSwitchIcon onClick={() => changeGrid("card")} />
        <ListSwitchIcon onClick={() => changeGrid("list")} />
      </div>
      <select onChange={handleSort}>
        <option value="LATEST">최신순</option>
        <option value="LOWEST_ACCURACY">정답률 낮은 순</option>
      </select>
    </div>
  );
}
