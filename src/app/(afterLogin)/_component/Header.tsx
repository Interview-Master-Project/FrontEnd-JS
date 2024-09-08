"use client";

import styles from "./header.module.scss";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function Header() {
  const pathname = usePathname();

  // menu는 url 경로(string)을 의미
  const [menu, setMenu] = useState(pathname.split("/")[1]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Image src={logo} alt="로고" />
          <h3>Logo</h3>
        </div>
        <div></div>
      </div>
      <div className={styles.headerRight}>오른쪽</div>
    </header>
  );
}
