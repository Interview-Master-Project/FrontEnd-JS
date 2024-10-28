import { useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import Selector from "@/app/_component/selector/Selector";
import { IoFilterOutline } from "react-icons/io5";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./filterBox.module.scss";

const maxCorrectSelector = [
  { value: "10", label: "정답률 10% 이하" },
  { value: "20", label: "정답률 20% 이하" },
  { value: "30", label: "정답률 30% 이하" },
  { value: "40", label: "정답률 40% 이하" },
  { value: "50", label: "정답률 50% 이하" },
  { value: "60", label: "정답률 60% 이하" },
  { value: "70", label: "정답률 70% 이하" },
  { value: "80", label: "정답률 80% 이하" },
  { value: "90", label: "정답률 90% 이하" },
];

export default function AdvancedQDropdown() {
  const { maxCorrectRate, changeMaxCorrectRate } = useSearchStore();
  const [isAdvancedQOpen, setIsAdvancedQOpen] = useState(false);

  const handleAdvancedQOffDropdown = () => {
    setIsAdvancedQOpen(false);
  };

  const handleAdvancedQCloseDropdown = () => {
    setIsAdvancedQOpen(!isAdvancedQOpen);
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
        containerWidth={250}
        positionLeft
        positionTop={80}
        variant="foreground"
      >
        <Selector
          width={250}
          onChange={(rate) => changeMaxCorrectRate(+rate)}
          options={maxCorrectSelector}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}
