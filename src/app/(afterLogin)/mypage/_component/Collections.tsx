"use client";

import styles from "./collections.module.scss";
import Link from "next/link";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { FaChevronRight } from "react-icons/fa";
import TabMenu from "@/app/(afterLogin)/_component/TabMenu";
import clsx from "clsx";
import { useState } from "react";

export default function Collections() {
  const [tabMenu, setTabMenu] = useState("coll");

  const handleTabClick = (selectTab: string) => setTabMenu(selectTab);

  // dummy data
  const collections = [
    {
      id: 1,
      image: faker.image.urlLoremFlickr(),
      isPrivate: true,
      title: faker.lorem.words(3),
    },
    {
      id: 2,
      image: faker.image.urlLoremFlickr(),
      isPrivate: true,
      title: faker.lorem.words(3),
    },
    {
      id: 3,
      image: faker.image.urlLoremFlickr(),
      isPrivate: true,
      title: faker.lorem.words(3),
    },
    {
      id: 4,
      image: faker.image.urlLoremFlickr(),
      isPrivate: true,
      title: faker.lorem.words(3),
    },
    {
      id: 5,
      image: faker.image.urlLoremFlickr(),
      isPrivate: true,
      title: faker.lorem.words(3),
    },
  ];

  return (
    <div className={styles.collections}>
      <section>
        <TabMenu>
          <Link
            href="/mypage?categories=coll"
            className={clsx(
              styles.tab,
              tabMenu === "coll" && styles.tabFocused
            )}
            onClick={() => handleTabClick("coll")}
          >
            내 컬렉션
          </Link>
          <Link
            href="/mypage?categories=hist"
            className={clsx(
              styles.tab,
              tabMenu === "hist" && styles.tabFocused
            )}
            onClick={() => handleTabClick("hist")}
          >
            히스토리
          </Link>
        </TabMenu>
      </section>
      <Link href="/mypage/newcoll" className={styles.createCollectionBtn}>
        + 새 컬렉션 추가
      </Link>
      {collections.map(({ id, title, isPrivate, image }) => {
        return (
          <Link
            href={`/mypage/collections?id=${id}`}
            key={id}
            className={styles.collection}
          >
            <div className={styles.collectionInfo}>
              <Image src={image} alt={`컬렉션_${id}`} width={80} height={80} />
              <div>
                <div className={styles.collectionAccess}>
                  <span>{isPrivate ? "Private" : "Public"}</span>
                </div>
                <h4>{title}</h4>
              </div>
            </div>
            <FaChevronRight className={styles.rightIcon} />
          </Link>
        );
      })}
    </div>
  );
}
