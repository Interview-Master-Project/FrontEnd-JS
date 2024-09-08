import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Header from "@/app/(afterLogin)/_component/Header";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}
