"use client";

import { useState } from "react";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import styles from "./selector.module.scss";

type TOption = {
  value: string;
  label: string;
};

type Props = {
  width: number; // 외부에서 width 결정
  onChange: (value: string) => void;
  options: Array<TOption>;
};

export default function Selector({ width, onChange, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: TOption) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        width,
      }}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <span>{selected.label}</span>
        <DownIcon />
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <select
        value={selected.value}
        onChange={(e) =>
          handleSelect(
            options.find(({ value }) => value === e.target.value) || options[0]
          )
        }
        className={styles.hiddenSelect}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
