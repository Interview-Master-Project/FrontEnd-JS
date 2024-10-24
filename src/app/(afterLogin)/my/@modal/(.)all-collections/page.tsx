"use client";

import { useEffect, useState } from "react";
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
    setOffset((prevOffset) => {
      const newOffset = prevOffset + offsetAdd;
      refetch({ offset: newOffset });
      return newOffset;
    });
  };

  // useEffect(() => {
  //   console.log(data?.myCollections.pageInfo.currentPage);
  //   console.log(data?.myCollections.pageInfo.hasNextPage);
  //   console.log(offset);
  // }, [data, offset]);

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
            onClick={() => {
              // e.preventDefault();
              handleOffset(-5);
            }}
          >
            이전
          </button>
          <button
            disabled={!data?.myCollections.pageInfo.hasNextPage}
            onClick={() => {
              // e.preventDefault();
              handleOffset(5);
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
