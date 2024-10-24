"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { MY_COLLECTIONS, IData } from "@/graphql/query/my-collections";
import { useClientFetch } from "@/hooks/useClientFetch";
import BackButton from "@/app/_component/BackButton";
import styles from "./page.module.scss";
import List from "../../_component/collections/List";

export default function Page() {
  const [offset, setOffset] = useState(0);
  const { data, loading, error, refetch } = useClientFetch<IData>(
    MY_COLLECTIONS,
    {
      variables: {
        sort: "LATEST",
        offset,
      },
    },
    true
  );

  const handleOffset = (offsetAdd: number) => {
    setOffset(offset + offsetAdd);
  };

  useEffect(() => {
    refetch({ offset });
  }, [refetch]);

  console.log(offset);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <BackButton />
          <h1>내 전체 컬렉션</h1>
        </div>
        <List />
        <div className={styles.modalFooter}>
          <button
            disabled={data?.myCollections.pageInfo.currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              handleOffset(0);
            }}
          >
            이전
          </button>
          <button
            disabled={data?.myCollections.pageInfo.hasNextPage}
            onClick={(e) => {
              e.preventDefault();
              handleOffset(8);
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
