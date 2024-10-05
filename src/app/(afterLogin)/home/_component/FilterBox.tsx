"use client";

import { useState } from "react";
import { ALL_CATEGORIES } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import { useSearchFilterStore } from "@/store/useSearchFilterStore";
import styles from "./filterBox.module.scss";

interface ICategory {
  id: string;
  name: string;
}

interface ICategories {
  getAllCategories: ICategory[];
}

export default function FilterBox() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery<ICategories>(ALL_CATEGORIES);
  const { selectedFilterList, changeFilter } = useSearchFilterStore();

  const handleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span>카테고리</span>
        <div className={styles.iconWrapper}>
          <DownIcon onClick={handleDropdown} />
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            {data?.getAllCategories?.map((category) => (
              <div key={category.id} className={styles.item}>
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedFilterList.includes(category.name)}
                  onChange={() => changeFilter(category.name)}
                />
                <label htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.container}>
        <span>고급 질의</span>
        <div className={styles.iconWrapper}>
          <DownIcon />
        </div>
      </div>
    </div>
  );
}
