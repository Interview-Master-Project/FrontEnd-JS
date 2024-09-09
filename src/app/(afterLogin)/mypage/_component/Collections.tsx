"use client";

import styles from "./collections.module.scss";
import Link from "next/link";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { FaChevronRight } from "react-icons/fa";

export default function Collections() {
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
  ];

  return (
    <div className={styles.collections}>
      <h3>내 컬렉션</h3>
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
              <Image
                src={image}
                alt={`컬렉션id:${id}`}
                width={80}
                height={80}
              />
              <div>
                <span>{isPrivate ? "private" : "public"}</span>
                <h4>{title}</h4>
              </div>
            </div>
            <FaChevronRight />
          </Link>
        );
      })}
    </div>
  );
}
