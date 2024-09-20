"use client";

import { HiOutlineAdjustmentsHorizontal as AdjustIcon } from "react-icons/hi2";
import { IoIosArrowDown as DownIcon } from "react-icons/io";
import styles from "./selectCategories.module.scss";
import { useState } from "react";

type Props = { titleOp?: boolean };

type Categories = {
  id: number;
  name: string;
  collection?: Collections[];
};

type Collections = {
  id: number;
  name: string;
};

const CATEGORIES_DATA: Categories[] = [
  {
    id: 1,
    name: "IT",
    collection: [
      { id: 1, name: "Java" },
      { id: 2, name: "CS" },
      { id: 3, name: "네트워크" },
      { id: 4, name: "Javascript" },
    ],
  },
  { id: 2, name: "경영" },
  { id: 3, name: "인성" },
  { id: 4, name: "카테고리4" },
  { id: 5, name: "카테고리5" },
  { id: 6, name: "카테고리6" },
  { id: 7, name: "카테고리7" },
  { id: 8, name: "카테고리8" },
  { id: 9, name: "카테고리9" },
];

export default function SelectCategories({ titleOp }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.wrapper}>
      {titleOp && <h3 className={styles.title}>카테고리 설정</h3>}
      <div className={styles.label} onClick={handleOpen}>
        <AdjustIcon className={styles.icon__adjust} />
        <div className={styles.openSelect}>
          <span>카테고리 선택</span>
        </div>
        <DownIcon className={styles.icon__down} />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            {CATEGORIES_DATA.map((item: Categories, index: number) => {
              return (
                <li key={index} className={styles.listItem}>
                  <input type="checkbox" name={item.name} />
                  <span>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
