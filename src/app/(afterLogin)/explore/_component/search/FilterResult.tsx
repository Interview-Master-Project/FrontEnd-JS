"use client";

import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { TiDelete as DeleteIcon } from "react-icons/ti";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import { useSortOffsetStore } from "@/store/useSortOffsetStore";
import styles from "./filterResult.module.scss";

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
  const { changeOffset, changeSort } = useSortOffsetStore();

  const categoryIds = categories.map(({ id }) => id);
  const router = useRouter();
  const handleSearch = () => {
    setFilters({ keywords, categories: categoryIds, maxCorrectRate });
    router.push("/explore");
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
            key={category.id}
            onClick={() => removeCategory(category)}
          >
            {category.name}
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
