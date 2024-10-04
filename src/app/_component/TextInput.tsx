import {
  ButtonHTMLAttributes,
  ComponentProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import clsx from "clsx";
import styles from "./textInput.module.scss";

function TextInputWrapper({ children, className }: ComponentProps<"div">) {
  return <div className={clsx(className, styles.wrapper)}>{children}</div>;
}

function Input({ name, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="text" className={styles.input} {...rest} />;
}

function Icon({ children }: PropsWithChildren) {
  return <div className={styles.icon}>{children}</div>;
}

function Button({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
}

export const TextInput = Object.assign(TextInputWrapper, {
  Input,
  Icon,
  Button,
});
