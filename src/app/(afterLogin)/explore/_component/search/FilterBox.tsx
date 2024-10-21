"use client";

import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_ALL_CATEGORIES, IData } from "@/graphql/query/get-all-categories";
import { useSearchStore } from "@/store/useSearchStore";
import { Filter } from "./Filter";
import { CiFilter } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";
import { useState } from "react";

export default function FilterBox() {
  const { data } = useClientFetch<IData>(GET_ALL_CATEGORIES, {}, false);
  const maxCorrectSelector = [25, 50, 75];
  const { categories, maxCorrectRate, changeCategories, changeMaxCorrectRate } =
    useSearchStore();

  const [isOpen, setIsOpen] = useState({
    category: false,
    advancedQ: false,
  });
  const handleOpen = (identifier: "category" | "advancedQ") => {
    setIsOpen((prev) => {
      return {
        ...prev,
        [identifier]: !prev[identifier],
      };
    });
  };

  return (
    <div className={styles.wrapper}>
      <Filter onClick={() => handleOpen("category")}>
        <Filter.Icon>
          <CiFilter />
        </Filter.Icon>
        <Filter.Label>카테고리</Filter.Label>
        <Filter.Icon>
          <DownIcon />
        </Filter.Icon>
        <Filter.Dropdown
          className={`${styles.dropdown} ${
            !isOpen.category ? styles.hidden : ""
          }`}
        >
          {data?.getAllCategories?.map(({ id, name }) => (
            <div key={id} className={styles.item}>
              <input
                type="checkbox"
                id={`category-${id}`}
                name="categoriesId"
                value={id}
                checked={categories.includes(name)}
                onChange={() => changeCategories(name)}
              />
              <label htmlFor={`category-${id}`}>{name}</label>
            </div>
          ))}
        </Filter.Dropdown>
      </Filter>
      <Filter onClick={() => handleOpen("advancedQ")}>
        <Filter.Icon>
          <IoFilterOutline />
        </Filter.Icon>
        <Filter.Label>고급 질의</Filter.Label>
        <Filter.Icon>
          <DownIcon />
        </Filter.Icon>
        <Filter.Dropdown
          className={`${styles.dropdown} ${
            !isOpen.advancedQ ? styles.hidden : ""
          }`}
        >
          {maxCorrectSelector.map((rate, idx) => (
            <div key={idx} className={styles.item}>
              <input
                type="checkbox"
                id={`under${rate}`}
                name={`under${rate}`}
                value={rate}
                checked={maxCorrectRate === rate}
                onChange={() => changeMaxCorrectRate(rate)}
              />
              <label htmlFor={`under${rate}`}>정답률 {rate}% 이하</label>
            </div>
          ))}
        </Filter.Dropdown>
      </Filter>
    </div>
  );
}
