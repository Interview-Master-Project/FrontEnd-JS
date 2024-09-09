import styles from "./page.module.scss";
import MyAccount from "./_component/MyAccount";
import Collections from "./_component/Collections";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>마이페이지</div>
      <div className={styles.userInfo}>
        <MyAccount />
        <div className={styles.userLog}>
          <h3>대시보드</h3>
          <div>제출 수</div>
        </div>
      </div>
      <Collections />
    </main>
  );
}
