"use client";

import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import { faker } from "@faker-js/faker";
import TabMenu from "./TabMenu";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Header() {
  const segment = useSelectedLayoutSegment(); // 현재 url 위치

  // dummy data
  const user = {
    username: "유준상",
    image: faker.image.avatarGitHub(),
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <h3>Logo</h3>
        </div>
        <TabMenu>
          <Link
            href="/home"
            className={clsx(
              styles.tab,
              segment === "home" && styles.tabFocused
            )}
          >
            질문 리스트
          </Link>
          <Link
            href="/mypage"
            className={clsx(
              styles.tab,
              segment === "mypage" && styles.tabFocused
            )}
          >
            마이 페이지
          </Link>
        </TabMenu>
      </div>
      <div className={styles.headerRight}>
        <Image
          src={user.image}
          alt={user.username}
          width={36}
          height={36}
          className={styles.userImg}
        />
        <span>{user.username}</span>
      </div>
    </header>
  );
}
