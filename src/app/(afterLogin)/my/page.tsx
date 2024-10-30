import dynamic from "next/dynamic";
import MyAccount from "./_component/MyAccount";
import Collections from "./_component/collections/Collections";
import Histories from "./_component/histories/Histories";
import styles from "./page.module.scss";

const Chart = dynamic(() => import("./_component/dashboard/HeatMapChart"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

type Props = {
  searchParams: {
    sort?: "LATEST" | "LOWEST_ACCURACY";
    offset?: string;
  };
};

export default function Page({ searchParams }: Props) {
  return (
    <div className={styles.mypageWrapper}>
      <div className={styles.rowContentsWrapper}>
        <MyAccount />
        <Chart />
      </div>
      <div className={styles.rowContentsWrapper}>
        <Collections searchParams={searchParams} />
        <Histories />
      </div>
    </div>
  );
}
