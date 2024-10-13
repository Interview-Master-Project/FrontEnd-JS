import { ReactNode } from "react";
import Title from "@/app/(afterLogin)/my/_component/Title";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function MyLayout({ children, modal }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <Title />
      </div>
      {children}
      {modal}
    </main>
  );
}
