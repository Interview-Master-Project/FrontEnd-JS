"use client";

import { useState } from "react";
import { useClientFetch } from "@/hooks/useClientFetch";
import { GET_ALL_CATEGORIES, IData } from "@/graphql/query/get-all-categories";
import { useSearchStore } from "@/store/useSearchStore";
import { CiFilter } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";

export default function FilterBox() {
  const { data } = useClientFetch<IData>(GET_ALL_CATEGORIES, {}, false);
  const maxCorrectSelector = [25, 50, 75];
  const { categories, maxCorrectRate, changeCategories, changeMaxCorrectRate } =
    useSearchStore();

  const [isOpen, setIsOpen] = useState({
    category: false,
    advancedQ: false,
  });

  const handleOffDropdown = (key: keyof typeof isOpen) => {
    setIsOpen((prevState) => {
      return {
        ...prevState,
        [key]: false,
      };
    });
  };

  const handleCloseDropdown = (key: keyof typeof isOpen) => {
    setIsOpen((prevState) => {
      return {
        ...prevState,
        [key]: !prevState[key],
      };
    });
  };

  return (
    <div className={styles.wrapper}>
      <Dropdown
        className={styles.dropdown}
        onClose={() => handleOffDropdown("category")}
      >
        <Dropdown.Active
          onClick={() => handleCloseDropdown("category")}
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
          isOpen={isOpen.category}
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
      <Dropdown
        className={styles.dropdown}
        onClose={() => handleOffDropdown("advancedQ")}
      >
        <Dropdown.Active
          onClick={() => handleCloseDropdown("advancedQ")}
          boxWidth={500}
          boxHeight={80}
        >
          <div className={styles.advancedQBtn}>
            <div>
              <IoFilterOutline />
              <span>고급 질의</span>
            </div>
            <div>
              <DownIcon />
            </div>
          </div>
        </Dropdown.Active>
        <Dropdown.Menu
          isOpen={isOpen.advancedQ}
          containerWidth={500}
          positionLeft
          positionTop={80}
          variant="foreground"
        >
          {maxCorrectSelector.map((rate) => (
            <Dropdown.Item
              key={rate}
              onClick={() => changeMaxCorrectRate(rate)}
            >
              <div className={styles.item}>
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
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
