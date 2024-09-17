"use client";

import styles from "./saveModal.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from "next/navigation";

export default function SaveModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <Image src={logo} alt="로고" className={styles.logo} />
          <h1>이 컬렉션을 추가하시겠습니까?</h1>
        </div>
        <div className={styles.modalBody}>
          <button onClick={onClickClose}>취소</button>
          <Link href="/mypage">저장</Link>
        </div>
      </div>
    </div>
  );
}
