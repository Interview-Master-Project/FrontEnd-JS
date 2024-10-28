"use client";

import { useState } from "react";
import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_ALL_CATEGORIES, IData } from "@/graphql/query/get-all-categories";
import { useSearchStore } from "@/store/useSearchStore";
import { CiFilter } from "react-icons/ci";
// import { IoFilterOutline } from "react-icons/io5";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";
import AdvancedQDropdown from "./AdvancedQDropdown";

export default function FilterBox() {
  const { data } = useClientFetch<IData>(GET_ALL_CATEGORIES, {}, false);
  const maxCorrectSelector = [25, 50, 75];
  const { categories, maxCorrectRate, changeCategories, changeMaxCorrectRate } =
    useSearchStore();

  // const [isOpen, setIsOpen] = useState({
  //   category: false,
  //   advancedQ: false,
  // });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAdvancedQOpen, setIsAdvancedQOpen] = useState(false);

  const handleCategoryOffDropdown = () => {
    setIsCategoryOpen(false);
    // if (key === "advancedQ") {
    //   setIsAdvancedQOpen(false);
    // } else if (key === "category") {
    // }
    // setIsOpen((prevState) => {
    //   return {
    //     ...prevState,
    //     [key]: false,
    //   };
    // });
  };

  const handleAdvancedQOffDropdown = () => {
    setIsAdvancedQOpen(false);
  };

  const handleCategoryCloseDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleAdvancedQCloseDropdown = () => {
    setIsAdvancedQOpen(!isAdvancedQOpen);
    // if (key === "advancedQ") {
    // } else if (key === "category") {
    //   setIsCategoryOpen(!isCategoryOpen);
    // }
    // setIsOpen((prevState) => {
    //   return {
    //     ...prevState,
    //     [key]: !prevState[key],
    //   };
    // });
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
          >
            {data?.getAllCategories.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => changeCategories(category)}
              >
                <div key={category.id} className={styles.item}>
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    name="categoriesId"
                    value={category.id}
                    checked={categories.includes(category)}
                    onChange={() => changeCategories(category)}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <AdvancedQDropdown />
      </div>
    </>
  );
}
