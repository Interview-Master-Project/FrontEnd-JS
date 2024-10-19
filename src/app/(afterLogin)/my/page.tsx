import dynamic from "next/dynamic";
import styles from "./page.module.scss";
import MyAccount from "./_component/MyAccount";
import Collections from "./_component/Collections";

const Chart = dynamic(() => import("./_component/dashboard/HeatMapChart"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function Page() {
  return (
    <>
      <div className={styles.userInfo}>
        <MyAccount />
        {/* <DashBoard /> */}
        <Chart />
      </div>
      <Collections />
    </>
  );
}
