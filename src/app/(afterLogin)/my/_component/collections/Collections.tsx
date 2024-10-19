import Link from "next/link";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { FaChevronRight as RightIcon } from "react-icons/fa";
import List from "./List";
import styles from "./collections.module.scss";

export default async function Collections() {
  return (
    <div className={styles.collections}>
      <h3>내 컬렉션</h3>
      <Link href="/my/newcoll">
        <ContainedButton>+ 새 컬렉션 추가</ContainedButton>
      </Link>
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
