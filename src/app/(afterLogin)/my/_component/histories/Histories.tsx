import Link from "next/link";
import { FaChevronRight as RightIcon } from "react-icons/fa";
import List from "./List";
import styles from "./histories.module.scss";

export default function Histories() {
  return (
    <div className={styles.histories}>
      <h3>히스토리</h3>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Link href="/my">
            <RightIcon />
            <span>전체 보기</span>
          </Link>
        </div>
        <List />
      </div>
    </div>
  );
}
