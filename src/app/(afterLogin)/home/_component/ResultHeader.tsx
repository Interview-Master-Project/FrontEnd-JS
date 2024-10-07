"use client";

import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import { HiOutlineSquares2X2 as CardSwitchIcon } from "react-icons/hi2";
import { HiMenu as ListSwitchIcon } from "react-icons/hi";
import { TiDelete as DeleteIcon } from "react-icons/ti";
import Button from "@/app/_component/Button";
import { useSearchGridStore } from "@/store/useSearchGridStore";
import { useSearchStore } from "@/store/useSearchStore";
import { ChangeEventHandler } from "react";
import styles from "./resultHeader.module.scss";

export default function ResultHeader() {
  const { changeGrid } = useSearchGridStore();
  const { selectedFilterList, changeFilter } = useSearchFilterStore();
  const { changeSort } = useSearchStore();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const sort = e.target.value as "LATEST" | "LOWEST_ACCURACY";

    // debugging
    console.log("sort 변경: ", sort);
    changeSort(sort);
  };

  return (
    <div className={styles.contentsHeader}>
      <div className={styles.headerSection}>
        <span>필터</span>
        {selectedFilterList?.map((filter) => (
          <Button
            className={styles.filterBtn}
            key={filter}
            onClick={() => changeFilter(filter)}
          >
            {filter}
            <DeleteIcon className={styles.deleteIcon} />
          </Button>
        ))}
      </div>
      <div className={styles.headerSection}>
        <div onClick={() => changeGrid("card")}>
          <CardSwitchIcon />
        </div>
        <div onClick={() => changeGrid("list")}>
          <ListSwitchIcon />
        </div>
        <form>
          <select
            name="sort"
            id="sort"
            className={styles.select}
            onChange={handleChange}
          >
            <option value="LATEST">최신순</option>
            <option value="LOWEST_ACCURACY">정답률 낮은 순</option>
          </select>
        </form>
      </div>
    </div>
  );
}
