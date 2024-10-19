"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ME, IData } from "@/graphql/query/me";
import { useClientFetch } from "@/hooks/useClientFetch";
import { MdModeEdit as EditIcon } from "react-icons/md";
import { faker } from "@faker-js/faker";
import { KakaoLogo, NaverLogo } from "../_lib/oAuthLogo";
import { Dropdown } from "@/app/_component/dropdown/Dropdown";
import styles from "./myAccount.module.scss";

export default function MyAccount() {
  const { data, loading, error } = useClientFetch<IData>(ME, {}, true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = {
    ...data,
    image: faker.image.avatarGitHub(),
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOffDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.userProfile}>
      <h3>내 계정</h3>
      <Dropdown onClose={handleOffDropdown} className={styles.profileEditBtn}>
        <Dropdown.Active
          onClick={handleCloseDropdown}
          boxWidth={36}
          boxHeight={36}
        >
          <EditIcon />
        </Dropdown.Active>
        <Dropdown.Menu isOpen={isDropdownOpen} containerWidth={160}>
          <Dropdown.Item>
            <Link href="/my/logout">로그아웃</Link>
          </Dropdown.Item>
          <Dropdown.Item variant="alert">
            <Link href="/my/delete-account">회원탈퇴</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Image
        src={user.image}
        alt={`${user.me?.nickname}의 프로필`}
        width={144}
        height={144}
      />
      <div className={styles.logoName}>
        {user?.me?.oAuthProvider === "KAKAO" && (
          <KakaoLogo className={styles.logo} />
        )}
        {user?.me?.oAuthProvider === "NAVER" && (
          <NaverLogo className={styles.logo} />
        )}
        <span>{user?.me?.nickname}</span>
      </div>
    </div>
  );
}
