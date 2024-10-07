import { ComponentProps, InputHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./textInput.module.scss";
import Button from "./Button";

function TextInputWrapper({ children, className }: ComponentProps<"div">) {
  return <div className={clsx(className, styles.wrapper)}>{children}</div>;
}

function Input({ name, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input name={name} type="text" className={styles.input} {...rest} />;
}

function Icon({ children }: PropsWithChildren) {
  return <div className={styles.icon}>{children}</div>;
}

export const TextInput = Object.assign(TextInputWrapper, {
  Input,
  Icon,
  Button: Button,
});
