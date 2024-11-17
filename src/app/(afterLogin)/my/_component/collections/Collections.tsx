"use client";

import Link from "next/link";
import ContainedButton from "@/app/_component/button/ContainedButton";
import { useClientFetch } from "@/hooks/useClientFetch";
import { MY_COLLECTIONS, IData } from "@/graphql/query/my-collections";
import List from "./List";
import Navigator from "./Navigator";
import Sort from "./Sort";
import styles from "./collections.module.scss";

type Props = {
  searchParams: {
    sort?: "LATEST" | "LOWEST_ACCURACY";
    offset?: string;
  };
};

export default function Collections({ searchParams }: Props) {
  const { sort, offset } = searchParams;
  const { data, loading, error } = useClientFetch<IData>(
    MY_COLLECTIONS,
    {
      variables: {
        sort: sort ?? "LATEST",
        offset: Number(offset) ?? 0,
      },
    },
    true
  );

  if (loading)
    return (
      <div className={styles.collections}>
        <span>로딩중...</span>
      </div>
    );
  if (error)
    return (
      <div className={styles.collections}>
        <span>데이터가 없습니다. 오류일 수도 있습니다.</span>
      </div>
    );

  return (
    <div className={styles.collections}>
      <h3>내 컬렉션</h3>
      <div className={styles.sort}>
        <Sort />
      </div>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <Link href="/my/newcoll">
            <ContainedButton>+ 새 컬렉션 추가</ContainedButton>
          </Link>
        </div>
        <List data={data!} sort={sort} offset={offset} />
      </div>
      <Navigator pageInfo={data?.myCollections.pageInfo!} />
    </div>
  );
}
