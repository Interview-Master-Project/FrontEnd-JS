"use client";

import { useState } from "react";
import { ALL_CATEGORIES } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";

interface ICategory {
  id: string;
  name: string;
}

interface ICategories {
  getAllCategories: ICategory[];
}

export default function FilterBox() {
  const { data } = useQuery<ICategories>(ALL_CATEGORIES);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelection = (id: string) => {
    setSelectedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span>카테고리</span>
        <div className={styles.iconWrapper}>
          <DownIcon onClick={toggleDropdown} />
        </div>
        {isOpen && (
          <div className={styles.dropdown}>
            {data?.getAllCategories?.map((category) => (
              <div key={category.id} className={styles.item}>
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedList.includes(category.id)}
                  onChange={() => handleSelection(category.id)}
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
