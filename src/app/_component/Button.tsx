import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );
}
