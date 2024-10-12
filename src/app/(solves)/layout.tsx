import { ReactNode } from "react";
import Footer from "./_component/Footer";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.activeBar}>목록</div>
        <div>기록</div>
      </div>
      {children}
      <Footer />
    </div>
  );
}
