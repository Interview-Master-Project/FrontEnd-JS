"use client";

import Link from "next/link";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { MY_COLLECTIONS } from "@/graphql/query";
import styles from "./collections.module.scss";

export interface ICollection {
  imgUrl: string;
  access: "PUBLIC" | "PRIVATE";
  name: string;
  id: string;
}

export interface ICollections {
  collections: ICollection[];
}

export interface IUserCollections {
  myCollections: ICollections;
}

export default function Collections() {
  const { data } = useQuery<IUserCollections | undefined>(MY_COLLECTIONS);
  console.log(data?.myCollections?.collections);

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
      {data?.myCollections?.collections?.map(({ id, imgUrl, access, name }) => {
        // Google Drive 이미지 링크를 변환
        const modifiedImgUrl = imgUrl.includes("drive.google.com")
          ? imgUrl
              .replace("/view?usp=sharing", "")
              .replace("file/d/", "uc?export=view&id=")
          : imgUrl;

        return (
          <Link
            href={`/mypage/collections?id=${id}`}
            key={id}
            className={styles.collection}
          >
            <div className={styles.collectionInfo}>
              <Image
                src={modifiedImgUrl}
                alt={`컬렉션_${id}`}
                width={80}
                height={80}
              />
              <div>
                <div className={styles.collectionAccess}>
                  <span>{access === "PRIVATE" ? "Private" : "Public"}</span>
                </div>
                <h4>{name}</h4>
              </div>
            </div>
            <FaChevronRight className={styles.rightIcon} />
          </Link>
        );
      })}
    </div>
  );
}
