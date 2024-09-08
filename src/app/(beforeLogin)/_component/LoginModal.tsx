"use client";

import styles from "./loginModal.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import kakaoLoginLogo from "../../../../public/kakao_login_large_wide.png";
import naverLoginLogo from "../../../../public/btnG_naver.png";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const naverRedirectUri = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;
  const state = "interview-quiz";

  const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&redirect_uri=${naverRedirectUri}&response_type=code&state=${state}`;

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
          <h1>로그인</h1>
          <p>소셜 계정으로 간편 로그인하세요!</p>
        </div>
        <div className={styles.modalBody}>
          <Link href={naverUrl}>
            <Image src={naverLoginLogo} alt="네이버 로그인" />
          </Link>
          <Link href={kakaoUrl}>
            <Image src={kakaoLoginLogo} alt="카카오 로그인" />
          </Link>
        </div>
      </div>
    </div>
  );
}
