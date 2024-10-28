import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import { IoFilterOutline } from "react-icons/io5";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import { useSearchStore } from "@/store/useSearchStore";
import { useState } from "react";
import styles from "./filterBox.module.scss";

export default function AdvancedQDropdown() {
  const maxCorrectSelector = [25, 50, 75];
  const { categories, maxCorrectRate, changeCategories, changeMaxCorrectRate } =
    useSearchStore();

  const [isAdvancedQOpen, setIsAdvancedQOpen] = useState(false);

  const handleAdvancedQOffDropdown = () => {
    setIsAdvancedQOpen(false);
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
    <Dropdown className={styles.dropdown} onClose={handleAdvancedQOffDropdown}>
      <Dropdown.Active
        onClick={handleAdvancedQCloseDropdown}
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
        isOpen={isAdvancedQOpen}
        containerWidth={500}
        positionLeft
        positionTop={80}
        variant="foreground"
      >
        {maxCorrectSelector.map((rate) => (
          <Dropdown.Item key={rate} onClick={() => changeMaxCorrectRate(rate)}>
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
  );
}
