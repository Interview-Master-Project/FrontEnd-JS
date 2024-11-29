"use client";

import { useState } from "react";
import { FaChevronDown as DownIcon } from "react-icons/fa";
import { SortOrder } from "@/__api__/types";
import clsx from "clsx";
import styles from "./selector.module.scss";

type TOption = {
  value: any;
  label: string;
};

type Props = {
  width: number | string; // 외부에서 width 결정
  onChange: (value: SortOrder) => void;
  options: Array<TOption>;
  scrollOption?: boolean;
  selectedValue?: any;
  disabled?: boolean;
  defaultValue?: number;
};

export default function Selector({
  width,
  onChange,
  options,
  scrollOption = false,
  selectedValue,
  disabled,
  defaultValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[defaultValue ?? 2]);

  const handleSelect = (option: TOption) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.wrapper__disabled]: disabled,
      })}
      style={{
        width,
      }}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
      <div className={styles.selected} onClick={handleOpen}>
        <span>{selectedValue ?? selected?.label}</span>
        <DownIcon />
      </div>
      {isOpen && (
        <div
          className={clsx(styles.options, {
            [styles.options__scrollOption]: scrollOption,
          })}
        >
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
        value={selected?.value}
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
