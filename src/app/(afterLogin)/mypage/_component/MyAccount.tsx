"use client";

import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import styles from "./myAccount.module.scss";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { useState } from "react";

export default function MyAccount() {
  const [editDropdown, setEditDropdown] = useState(false);

  type User = {
    id?: string;
    email?: string;
    nickname: string;
    oAuthProvider: "KAKAO" | "NAVER";
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    image: string;
  };

  // dummy data
  const user: User = {
    nickname: "유준상",
    image: faker.image.avatarGitHub(),
    oAuthProvider: "KAKAO",
  };

  const handleDropdown = () => {
    setEditDropdown((prevState) => !prevState);
  };

  return (
    <div className={styles.userProfile}>
      <h3>내 계정</h3>
      <MdModeEdit className={styles.profileEditBtn} onClick={handleDropdown} />
      {editDropdown && (
        <div className={styles.profileEditDropdown}>
          <Link href="/mypage/logout" className={styles.dropdownItem}>
            로그아웃
          </Link>
          <Link href="/" className={styles.dropdownItem}>
            회원탈퇴
          </Link>
        </div>
      )}
      <Image src={user.image} alt={user.nickname} width={144} height={144} />
      <div className={styles.logo_name}>
        {user.oAuthProvider === "KAKAO" && <KakaoLogo />}
        {user.oAuthProvider === "NAVER" && <NaverLogo />}
        <span>{user.nickname}</span>
      </div>
    </div>
  );
}
