import styles from "./tabMenu.module.scss";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TabMenu({ children }: Props) {
  return <div className={styles.tabMenu}>{children}</div>;
}
