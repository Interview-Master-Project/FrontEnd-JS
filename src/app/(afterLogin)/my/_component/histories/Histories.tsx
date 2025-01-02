"use client";

import { useFetchMyHistory } from "../../_hooks/useFetchMyHistory";
import List from "./List";
import styles from "./histories.module.scss";

export default function Histories() {
  const { myHistoryData, loading, error } = useFetchMyHistory();

  return (
    <div className={styles.histories}>
      <h3>히스토리</h3>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}></div>
        {loading && <span>데이터 불러오는 중...</span>}
        {!loading && <List data={myHistoryData!} />}
      </div>
    </div>
  );
}
