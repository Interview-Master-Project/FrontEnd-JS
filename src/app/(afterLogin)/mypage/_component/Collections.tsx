"use client";

import styles from "./collections.module.scss";
import Link from "next/link";

export default function Collections() {
  return (
    <div className={styles.collections}>
      <h3>내 컬렉션</h3>
      <Link href="/">+ 새 컬렉션 추가</Link>
    </div>
  );
}
