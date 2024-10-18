import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./outlinedButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "base" | "red" | "green";
}

/**
 * 테두리가 강조된 버튼 컴포넌트
 * @param variant 색상(base | red | green)
 */
export default function OutlinedButton({
  children,
  variant = "base",
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(styles.button, {
        [styles.base]: variant === "base",
        [styles.red]: variant === "red",
        [styles.green]: variant === "green",
      })}
    >
      {children}
    </button>
  );
}
