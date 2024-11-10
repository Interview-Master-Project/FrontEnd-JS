"use client";

import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { InputHTMLAttributes } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import styles from "./input.module.scss";

export default function Input({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  const [enteredValue, setEnteredValue] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const { keywords, addKeyword } = useSearchStore();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      ref.current === document.activeElement &&
      enteredValue.trim().length &&
      keywords.length < 5
    ) {
      e.preventDefault();
      addKeyword(enteredValue.trim());

      // 상태 업데이트 지연 처리
      setTimeout(() => {
        setEnteredValue("");
      }, 0);
    } else return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  return (
    <input
      ref={ref}
      type="text"
      value={enteredValue}
      maxLength={20}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={styles.input}
      {...rest}
    />
  );
}
