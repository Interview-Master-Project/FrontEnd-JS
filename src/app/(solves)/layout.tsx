import { ReactNode } from "react";
import Footer from "./_component/Footer";
import styles from "./layout.module.scss";
import Sidebar from "./_component/Sidebar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}
