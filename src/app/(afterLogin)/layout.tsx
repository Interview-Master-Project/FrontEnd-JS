import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Header from "./_component/header/Header";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
