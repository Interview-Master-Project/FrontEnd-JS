"use client";

import { useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { useUserStore } from "@/store/useUserStore";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import Selector from "@/app/_component/selector/Selector";
import { IoFilterOutline } from "react-icons/io5";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";

// select option 배열 생성
const maxCorrectSelector = Array.from({ length: 9 }).map((_, idx) => {
  const percentage = (idx + 1) * 10;
  return { value: percentage.toString(), label: `정답률 ${percentage}% 이하` };
});

export default function AdvancedQDropdown() {
  const { maxCorrectRate, changeMaxCorrectRate } = useSearchStore();
  const [isAdvancedQOpen, setIsAdvancedQOpen] = useState(false);
  const { user } = useUserStore();

  const handleAdvancedQOffDropdown = () => {
    setIsAdvancedQOpen(false);
  };

  const handleAdvancedQCloseDropdown = () => {
    setIsAdvancedQOpen(!isAdvancedQOpen);
  };

  return (
    <Dropdown
      className={styles.dropdown}
      onClose={handleAdvancedQOffDropdown}
      disabled={!user}
    >
      <Dropdown.Active
        onClick={handleAdvancedQCloseDropdown}
        boxWidth={500}
        boxHeight={80}
        disabled={!user}
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
        isOpen={isAdvancedQOpen}
        containerWidth={250}
        positionLeft
        positionTop={80}
        variant="foreground"
      >
        <Selector
          width={250}
          onChange={(rate) => changeMaxCorrectRate(+rate)}
          options={maxCorrectSelector}
          selectedValue={maxCorrectRate}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
