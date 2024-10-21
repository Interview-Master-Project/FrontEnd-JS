"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { InputHTMLAttributes } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import styles from "./input.module.scss";

export default function Input({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  const [enteredValue, setEnteredValue] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const { addKeyword } = useSearchStore();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      ref.current === document.activeElement &&
      enteredValue.trim().length
    ) {
      addKeyword(enteredValue.trim());
      setEnteredValue("");
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      value={enteredValue}
      onChange={(e) => setEnteredValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className={styles.input}
      {...rest}
    />
  );
}
