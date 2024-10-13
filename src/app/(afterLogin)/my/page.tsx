import styles from "./page.module.scss";
import MyAccount from "./_component/MyAccount";
import DashBoard from "./_component/DashBoard";
import Collections from "./_component/Collections";

export default function Page() {
  return (
    <>
      <div className={styles.userInfo}>
        <MyAccount />
        <DashBoard />
      </div>
      <Collections />
    </>
  );
}
