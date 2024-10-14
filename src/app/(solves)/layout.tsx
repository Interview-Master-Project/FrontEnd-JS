import { ReactNode } from "react";
import Footer from "./_component/Footer";
import Sidebar from "./_component/Sidebar";
import SidebarInfo from "./_component/SidebarInfo";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <SidebarInfo />
      {children}
      <Footer />
    </div>
  );
}
