import { ComponentProps, PropsWithChildren } from "react";
import Input from "./Input";
import styles from "./textInput.module.scss";

function TextInputWrapper({ children }: ComponentProps<"div">) {
  return <div className={styles.wrapper}>{children}</div>;
}

function Icon({ children }: PropsWithChildren) {
  return <div className={styles.icon}>{children}</div>;
}

export const TextInput = Object.assign(TextInputWrapper, {
  Input,
  Icon,
});
