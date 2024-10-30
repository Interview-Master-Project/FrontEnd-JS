import List from "./List";
import styles from "./histories.module.scss";

export default function Histories() {
  return (
    <div className={styles.histories}>
      <h3>히스토리</h3>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}></div>
        <List />
      </div>
    </div>
  );
}
