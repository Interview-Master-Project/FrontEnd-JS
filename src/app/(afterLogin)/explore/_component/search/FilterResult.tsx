"use client";

import { useSearchStore } from "@/store/useSearchStore";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { TiDelete as DeleteIcon } from "react-icons/ti";
import styles from "./filterResult.module.scss";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";

export default function FilterResult() {
  const {
    keywords,
    categories,
    maxCorrectRate,
    removeKeyword,
    removeCategory,
    removeMaxCorrectRate,
  } = useSearchStore();

  const { setFilters } = useSearchFilterStore();

  const handleSearch = () => {
    setFilters({ filters: { keywords, categories, maxCorrectRate } });

    const updatedFilters = useSearchFilterStore.getState().filters;
    console.log("Updated Filters: ", updatedFilters);
  };

  return (
    <div className={styles.contentsHeader}>
      <div className={styles.headerSection}>
        <span>필터</span>
        {keywords?.map((keyword) => (
          <ContainedButton
            variant="base"
            key={keyword}
            onClick={() => removeKeyword(keyword)}
          >
            검색어 &gt; {keyword}
            <DeleteIcon className={styles.deleteIcon} />
          </ContainedButton>
        ))}
        {categories.map((category) => (
          <ContainedButton
            variant="base"
            key={category}
            onClick={() => removeCategory(category)}
          >
            {category}
            <DeleteIcon className={styles.deleteIcon} />
          </ContainedButton>
        ))}
        {maxCorrectRate && (
          <ContainedButton variant="base" onClick={removeMaxCorrectRate}>
            정답률 {maxCorrectRate}% 이하
            <DeleteIcon className={styles.deleteIcon} />
          </ContainedButton>
        )}
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
