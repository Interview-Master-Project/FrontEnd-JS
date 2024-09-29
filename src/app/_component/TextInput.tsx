import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import styles from "./textInput.module.scss";
import clsx from "clsx";

function TextInputMain({
  id,
  className,
  children,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label htmlFor={id}>
      {children}
      <input
        type="text"
        id={id}
        name={id}
        className={clsx(styles.input, className)}
        {...rest}
      />
    </label>
  );
}

function Button({
  className,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(styles.button, className)}>{children}</button>;
}

function Icon({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.icon, className)}>{children}</div>;
}

// 버튼과 아이콘 합성
export const TextInput = Object.assign(TextInputMain, {
  Button,
  Icon,
});
