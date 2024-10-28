"use client";

import { useState } from "react";
import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_ALL_CATEGORIES, IData } from "@/graphql/query/get-all-categories";
import { useSearchStore } from "@/store/useSearchStore";
import { CiFilter } from "react-icons/ci";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";
import AdvancedQDropdown from "./AdvancedQDropdown";
import Checkbox from "@/app/_component/checkbox/Checkbox";

export default function FilterBox() {
  const { data } = useClientFetch<IData>(GET_ALL_CATEGORIES, {}, false);
  const { categories, changeCategories } = useSearchStore();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryOffDropdown = () => {
    setIsCategoryOpen(false);
  };

  const handleCategoryCloseDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Dropdown
          className={styles.dropdown}
          onClose={handleCategoryOffDropdown}
        >
          <Dropdown.Active
            onClick={handleCategoryCloseDropdown}
            boxWidth={500}
            boxHeight={80}
          >
            <div className={styles.categoriesBtn}>
              <div>
                <CiFilter />
                <span>카테고리</span>
              </div>
              <div>
                <DownIcon />
              </div>
            </div>
          </Dropdown.Active>
          <Dropdown.Menu
            isOpen={isCategoryOpen}
            containerWidth={500}
            positionTop={80}
            positionLeft
            variant="foreground"
            scrollOption
          >
            {data?.getAllCategories.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => changeCategories(category)}
              >
                <Checkbox
                  id={`category-${category.id}`}
                  label={category.name}
                  checked={categories.includes(category)}
                  onChange={() => changeCategories(category)}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <AdvancedQDropdown />
      </div>
    </>
  );
}
