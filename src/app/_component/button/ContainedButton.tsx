import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./containedButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "base" | "red" | "green";
}

/**
 * 배경색이 강조된 버튼 컴포넌트
 * @param variant 색상(base | red | green)
 */
export default function ContainedButton({
  children,
  variant = "base",
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(className, styles.button, {
        [styles.base]: variant === "base",
        [styles.red]: variant === "red",
        [styles.green]: variant === "green",
      })}
    >
      {children}
    </button>
  );
}
