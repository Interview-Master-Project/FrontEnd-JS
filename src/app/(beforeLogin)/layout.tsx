import { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.scss";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}
