import dynamic from "next/dynamic";
import MyAccount from "./_component/MyAccount";
import Collections from "./_component/collections/Collections";
import Histories from "./_component/histories/Histories";
import styles from "./page.module.scss";

const Chart = dynamic(() => import("./_component/dashboard/HeatMapChart"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function Page() {
  return (
    <>
      <div className={styles.rowContentsWrapper}>
        <MyAccount />
        <Chart />
      </div>
      <div className={styles.rowContentsWrapper}>
        <Collections />
        <Histories />
      </div>
    </>
  );
}
