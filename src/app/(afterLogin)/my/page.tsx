import MyAccount from "./_component/MyAccount";
import MyLog from "./_component/dashboard/MyLog";
import Collections from "./_component/collections/Collections";
import { MyCollectionsQueryVariables } from "@/__api__/types";
import Histories from "./_component/histories/Histories";
import styles from "./page.module.scss";

type Props = {
  searchParams: MyCollectionsQueryVariables;
};

export default function Page({ searchParams }: Props) {
  return (
    <div className={styles.mypageWrapper}>
      <div className={styles.rowContentsWrapper}>
        {/* <MyAccount /> */}
        <MyLog />
      </div>
      <div className={styles.rowContentsWrapper}>
        <Collections searchParams={searchParams} />
        <Histories />
      </div>
    </div>
  );
}
