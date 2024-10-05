import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "base" | "red" | "green";
  contained?: boolean;
}

/**
 * 버튼 컴포넌트
 * @param contained true => 배경색 강조, false => 테두리색 강조
 * @param variant 색상(base | red | green)
 */
export default function Button({
  children,
  contained = true,
  variant = "base",
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        styles.button,
        {
          [styles.button_contained]: contained,
          [styles.button_outlined]: !contained,
        },
        {
          [styles.red]: variant === "red",
          [styles.green]: variant === "green",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
