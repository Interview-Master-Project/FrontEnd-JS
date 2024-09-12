import { ReactNode } from "react";
import styles from "./Container.module.scss";

type Props = { title: string; children: ReactNode };

export default function Container({ title, children }: Props) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
