import styles from "./page.module.scss";
import MyAccount from "./_component/MyAccount";
import DashBoard from "./_component/DashBoard";
import Collections from "./_component/Collections";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.title}>마이페이지</div>
      <div className={styles.userInfo}>
        <MyAccount />
        <DashBoard />
      </div>
      <Collections />
    </main>
  );
}
