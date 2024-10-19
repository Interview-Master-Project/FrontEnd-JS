"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { MY_COLLECTIONS, IData } from "@/graphql/query/my-collections";
import { MY_HISTORY, IData as IHistData } from "@/graphql/query/my-history";
import { FaChevronRight as RightIcon } from "react-icons/fa";
import styles from "./collections.module.scss";
import { useClientFetch } from "@/hooks/useClientFetch";

export default function Collections() {
  const [sort, setSort] = useState<"LATEST" | "LOWEST_ACCURACY">("LATEST");
  const [offset, setOffset] = useState(0);
  const { data, loading, error } = useClientFetch<IData>(
    MY_COLLECTIONS,
    {
      variables: {
        sort,
        offset,
      },
    },
    true
  );

  const [tabMenu, setTabMenu] = useState<"coll" | "hist">("coll");
  const handleTabClick = (selectTab: "coll" | "hist") => setTabMenu(selectTab);

  // 임시 히스토리 데이터 fetch 확인용
  const { data: HistData } = useClientFetch<IHistData>(
    MY_HISTORY,
    {
      variables: {
        offset: 0,
        filter: "PRIVATE",
      },
    },
    true
  );

  return (
    <div className={styles.collections}>
      <section>
        <Link
          href="/my?categories=coll"
          className={clsx(styles.tab, tabMenu === "coll" && styles.tabFocused)}
          onClick={() => handleTabClick("coll")}
        >
          내 컬렉션
        </Link>
        <Link
          href="/my?categories=hist"
          className={clsx(styles.tab, tabMenu === "hist" && styles.tabFocused)}
          onClick={() => handleTabClick("hist")}
        >
          히스토리
        </Link>
      </section>
      <Link href="/my/newcoll" className={styles.createCollectionBtn}>
        + 새 컬렉션 추가
      </Link>
      {data?.myCollections.collectionsWithAttempt.map(({ collection }) => {
        // Google Drive 이미지 링크를 변환
        const modifiedImgUrl = collection.imgUrl.includes("drive.google.com")
          ? collection.imgUrl
              .replace("/view?usp=sharing", "")
              .replace("file/d/", "uc?export=view&id=")
          : collection.imgUrl;

        return (
          <Link
            href={`/my/collections?id=${collection.id}`}
            key={collection.id}
            className={styles.collection}
          >
            <div className={styles.collectionInfo}>
              <Image
                src={modifiedImgUrl}
                alt={`컬렉션_${collection.id}`}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
                priority
              />
              <div>
                <div className={styles.collectionAccess}>
                  <span>
                    {collection.access === "PRIVATE" ? "Private" : "Public"}
                  </span>
                </div>
                <h4>{collection.name}</h4>
              </div>
            </div>
            <RightIcon className={styles.rightIcon} />
          </Link>
        );
      })}
      {/* 임시 데이터 확인용 */}
      {tabMenu === "hist" && (
        <p>{HistData?.myHistory.collectionsWithAttempt[0].collection.name}</p>
      )}
    </div>
  );
}
