"use client";

import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { useState } from "react";
import { ME } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import styles from "./myAccount.module.scss";

export default function MyAccount() {
  const { data } = useQuery(ME);

  console.log(data);

  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };

  const [editDropdown, setEditDropdown] = useState(false);

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
          <Link href="/mypage/delete-account" className={styles.dropdownItem}>
            회원탈퇴
          </Link>
        </div>
      )}
      <Image
        src={user.image}
        alt={user?.me?.nickname}
        width={144}
        height={144}
      />
      <div className={styles.logo_name}>
        {user?.me?.oAuthProvider === "KAKAO" && <KakaoLogo />}
        {user?.me?.oAuthProvider === "NAVER" && <NaverLogo />}
        <span>{user?.me?.nickname}</span>
      </div>
    </div>
  );
}
