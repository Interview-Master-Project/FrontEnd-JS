import Link from "next/link";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { MY_COLLECTIONS, IData } from "@/graphql/query/my-collections";
import { fetchQueryData } from "@/utils/fetchQueryData";
import List from "./List";
import Navigator from "./Navigator";
import styles from "./collections.module.scss";

type Props = {
  searchParams: {
    sort?: "LATEST" | "LOWEST_ACCURACY";
    offset?: string;
  };
};

export default async function Collections({ searchParams }: Props) {
  const { sort, offset } = searchParams;

  const { data, loading, error } = await fetchQueryData<IData>({
    query: MY_COLLECTIONS,
    variables: {
      sort: sort ?? "LATEST",
      offset: Number(offset) ?? 0,
    },
    requiresAuth: true,
  });

  return (
    <div className={styles.collections}>
      <h3>내 컬렉션</h3>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Link href="/my/newcoll">
            <ContainedButton>+ 새 컬렉션 추가</ContainedButton>
          </Link>
        </div>
        <List data={data} />
      </div>
      <Navigator pageInfo={data.myCollections.pageInfo} />
    </div>
  );
}
