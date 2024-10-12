"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { MY_COLLECTIONS } from "@/graphql/query";
import styles from "./collections.module.scss";

interface ICollection {
  id: string;
  name: string;
  access: "PUBLIC" | "PRIVATE";
  imgUrl: string;
}

export interface ICollections {
  collection: ICollection;
  totalAttempts: number;
  totalCorrectAttempts: number;
  recentAttempts: number;
  recentCorrectAttempts: number;
}

export interface ICollectionsWithAttempt {
  collectionsWithAttempt: ICollections[];
}

export interface IUserCollections {
  myCollections: ICollectionsWithAttempt;
}

export default function Collections() {
  const { data } = useQuery<IUserCollections>(MY_COLLECTIONS, {
    variables: {
      sort: "LATEST",
    },
  });

  const [tabMenu, setTabMenu] = useState("coll");

  const handleTabClick = (selectTab: string) => setTabMenu(selectTab);

  return (
    <div className={styles.collections}>
      <section>
        <Link
          href="/mypage?categories=coll"
          className={clsx(styles.tab, tabMenu === "coll" && styles.tabFocused)}
          onClick={() => handleTabClick("coll")}
        >
          내 컬렉션
        </Link>
        <Link
          href="/mypage?categories=hist"
          className={clsx(styles.tab, tabMenu === "hist" && styles.tabFocused)}
          onClick={() => handleTabClick("hist")}
        >
          히스토리
        </Link>
      </section>
      <Link href="/mypage/newcoll" className={styles.createCollectionBtn}>
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
            href={`/mypage/collections?id=${collection.id}`}
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
            <FaChevronRight className={styles.rightIcon} />
          </Link>
        );
      })}
    </div>
  );
}
