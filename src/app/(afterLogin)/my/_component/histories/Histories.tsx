import { MY_HISTORY, IData } from "@/graphql/query/my-history";
import { fetchQueryData } from "@/utils/fetchQueryData";
import List from "./List";
import styles from "./histories.module.scss";

export default async function Histories() {
  const { data } = await fetchQueryData<IData>({
    query: MY_HISTORY,
    variables: {
      offset: 0,
    },
    requiresAuth: true,
  });

  return (
    <div className={styles.histories}>
      <h3>히스토리</h3>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}></div>
        <List data={data} />
      </div>
    </div>
  );
}
