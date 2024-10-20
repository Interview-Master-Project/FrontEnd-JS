"use client";

import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { TiDelete as DeleteIcon } from "react-icons/ti";
import styles from "./filterResult.module.scss";

export default function FilterResult() {
  const { selectedFilterList, changeFilter } = useSearchFilterStore();

  const handleSearch = () => {
    // useSearchStore의 상태 변경 trigger
  };

  return (
    <div className={styles.contentsHeader}>
      <div className={styles.headerSection}>
        <span>필터</span>
        {selectedFilterList?.map((filter) => (
          <ContainedButton
            variant="base"
            key={filter}
            onClick={() => changeFilter(filter)}
          >
            {filter}
            <DeleteIcon className={styles.deleteIcon} />
          </ContainedButton>
        ))}
      </div>
      <div className={styles.headerSection}>
        <ContainedButton
          variant="base"
          onClick={handleSearch}
          className={styles.searchBtn}
        >
          검색
        </ContainedButton>
      </div>
    </div>
  );
}
